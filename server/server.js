var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/main');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var multer = require('multer');
var User = require('./app/models/user');
var BigTexts = require('./app/models/bigtext');
var GetStartedImages = require('./app/models/getStartedImages');
var ClientSayInfo = require('./app/models/clientSayInfo');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var port = 4000;
var router = express.Router();

var getStartedImagesFolder = 'public/images/get-started';
var clientPhotosFolder = 'public/images/client-photos';

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

// Register new users
router.post('/register', function(req, res){
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false, 
            message: 'Please enter an email and password'
        });
    }
    else {
        var newUser = new User({
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
                        expiresIn: 10080    //seconds
                    });
                    res.json({
                        success: true,
                        token: 'JWT' + token
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

app.get('/flash', function(req, res){
    // Set a flash message by passing the key, followed by the value, to req.flash(). 
    req.flash('info', 'Flash is back!')
    res.redirect('/');
});

// Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User ID is ' + req.user._id + '.');
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
		res.render("admin", { messages: req.flash('info') });
	});
});

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
		res.render("admin", { messages: req.flash('info') });
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
		res.render("admin", { messages: req.flash('info') });
	});
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

// Route-Home
app.get('/', function(req, res) {
    res.send('Homepage content to follow later');
});

// route for admin dashboard
var adminDashboard = require('./routes/admin');
app.use('/admin', adminDashboard);

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

// server to watch the port for runtime code changes
app.listen(port, function() {
    console.log('Night watch guarding the wall on port ' + port + '.');
});