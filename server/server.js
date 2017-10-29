//////////////////////////////////////////
///////// VARIABLE DECLARATIONS //////////
//////////////////////////////////////////

// module imports
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/main');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');

// file imports
var User = require('./app/models/user');
var BigTexts = require('./app/models/bigtext');
var GetStartedImages = require('./app/models/getStartedImages');
var ClientSayInfo = require('./app/models/clientSayInfo');
var adminDashboard = require('./routes/admin');

// variable declarations
var app = express();
var port = 4000;
var router = express.Router();
var getStartedImagesFolder = 'public/images/get-started';
var clientPhotosFolder = 'public/images/client-photos';

// image name formatter for multer config
var imagesHandler = function(originalFileName, folderName, newFileName) {
    var fileInfo = fs.readdirSync(folderName, 'utf8');
	return newFileName + '-' + (fileInfo.length + 1) + '.' + originalFileName.split('.').pop();
}

// multer config
var imageStorage = function(photosFolder, imageSectionString) {
    return multer.diskStorage({
        destination:function(req, file, cb){
            cb(null, photosFolder)
        },
        filename: function(req, file, cb){
            cb(null, imagesHandler(file.originalname, photosFolder, imageSectionString))
        }
    });
}

// defining multer's image object
var imageUpload = function(imagesFolder, imageFolderString) {
    return multer({
        storage: imageStorage(imagesFolder, imageFolderString)
    });
}

//////////////////////////////////////////
//////////// CONFIGURING APP /////////////
//////////////////////////////////////////

// configuring flash messages
app.use(cookieParser());
app.use(session({ 
    secret: 'keyboard cat',
    cookie: { secure: true }
}));
app.use(flash());

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// dealing with CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// user body parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log requests to console
app.use(morgan('dev'));

// Initialize passport for use
app.use(passport.initialize());

// Set url for API group routes
app.use('/api', router);

// connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// Passport strategy
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use admin page
app.use('/admin', adminDashboard);

//////////////////////////////////////////
//////////// POST API CALLS //////////////
//////////////////////////////////////////

// Register new users
router.post('/register', function(req, res){
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.json({
            success: false, 
            message: 'Please enter an email and password'
        });
    }
    else {
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        // Save the new user
        newUser.save(function(err) {
            if (err) {
                return res.json({
                    success: false, 
                    message: 'That email address already exists'
                });
            }
            res.json({
                success: true,
                message: 'Successfully created new user'
            });
        });
    }
});

// authenticate the user and get a JWT
router.post('/authenticate', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            req.send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create the token here
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 3600    //seconds
                    });
                    res.json({
                        success: true,
                        token: token
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Authentication failed. Password did not match'
                    });
                }
            });
        }
    });
});

// logout
router.get('/logout',function(req, res){
    req.session.destroy(function(err) {
        if (err) {
            res.send('Error occured while logout. Please try again')
        }
        else {
            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        }
    });
});

// add big text to db
app.post('/addbigtext', function(req, res) {
	var bigText = new BigTexts({
        text: req.body.bigtext
    });
	bigText.save(function(err) {
		if (err) {
			return res.status(400).send('Unable to save to db');
		}
		res.render("admin", { messages: req.flash('info') }, function(err, result) {
            res.redirect('/admin');
        });
	});
});

// upload and save images info to db
app.post('/addGetStartedImages', imageUpload(getStartedImagesFolder, 'get-started-image').any(), function(req, res, next){
	var newInfo = new GetStartedImages({
		imageName: req.files[0].filename,
		description: req.body.description,
		created: Date.now()
	});
	// Save the new user
	newInfo.save(function(err) {
		if (err) {
			return res.status(400).send('Unable to save to db');
		}
		res.render("admin", { messages: req.flash('info') }, function(err, result) {
            res.redirect('/admin');
        });
	});
});

// upload and save client photos and info to db
app.post('/addClientInfo', imageUpload(clientPhotosFolder, 'client-photo').any(), function(req, res, next){
	var clientInfo = new ClientSayInfo({
        clientphoto: req.files[0].filename, 
		clientcomment: req.body.clientcomment,
        clientname: req.body.clientname,
        clientlocation: req.body.clientlocation,
		created: Date.now()
	});
	// // Save the new user
	clientInfo.save(function(err) {
		if (err) {
			return res.status(400).send('Unable to save to db');
		}
		res.render("admin", { messages: req.flash('info') }, function(err, result) {
            res.redirect('/admin');
        });
	});
});

//////////////////////////////////////////
///////////// GET API CALLS //////////////
//////////////////////////////////////////

// Route-Home
app.get('/', function(req, res) {
    res.send('Homepage content to follow later');
});

// Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User ID is ' + req.user._id + '.');
});

// getBigText service
router.get('/getBigText', function(req, res) {
    BigTexts.find({}, function(err, texts) {
        if (err) throw err;
        if (!texts) {
            req.send({
                success: false,
                message: 'Error Occured.'
            })
        }
        else {
            res.json({
                success: true,
                texts: texts
            });
        }
    });
});

// getStartedImages service
router.get('/getProjectGallery', function(req, res) {
    GetStartedImages.find({}, function(err, images) {
        if (err) throw err;
        if (!images) {
            req.send({
                success: false,
                message: 'Error Occured.'
            })
        }
        else {
            res.json({
                success: true,
                projectGallery: images
            });
        }
    });
});

// getClientSayInfo service
router.get('/getClientSayInfo', function(req, res) {
    ClientSayInfo.find({}, function(err, info) {
        if (err) throw err;
        if (!info) {
            req.send({
                success: false,
                message: 'Error Occured.'
            })
        }
        else {
            res.json({
                success: true,
                clientInfo: info
            });
        }
    });
});

//////////////////////////////////////////
/////////////// MIDDLEWARES //////////////
//////////////////////////////////////////

// middleware to validate the secure APIs
router.use(function(req, res, next) {
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decode) {
            if (err) {
                res.status(500).send('Invalid token');
            }
            else {
                next();
            }
        });
    }
    else {
        res.send('Please send a token');
    }
});

//////////////////////////////////////////
////////////// WATCH SERVER //////////////
//////////////////////////////////////////

// server to watch the port for runtime code changes
app.listen(port, function() {
    console.log('Night watch guarding the wall on port ' + port + '.');
});