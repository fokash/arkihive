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
var randomstring = require('randomstring');

// file imports
var User = require('./app/models/user');
var BigTexts = require('./app/models/bigtext');
var GetStartedImages = require('./app/models/getStartedImages');
var ClientSayInfo = require('./app/models/clientSayInfo');
var adminDashboard = require('./routes/admin');
var verifyAccountToken = require('./routes/verify');
var changePassword = require('./routes/changePassword');
var mailer = require('./app/utils/mailer');

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
app.use(express.static(path.join(__dirname, 'dist')));

// dealing with CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
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

// include other routes page
app.use('/admin', adminDashboard);
app.use('/verify', verifyAccountToken);
app.use('/changePassword', changePassword);

// Route-Home
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});
//////////////////////////////////////////
//////////// POST API CALLS //////////////
//////////////////////////////////////////

// Register new users
router.post('/register', function(req, res){
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.json({
            success: false, 
            message: 'Please enter the name, email and password'
        });
    }
    else {
        // Generate secret token
        var secretToken = randomstring.generate();
        req.body.secretToken = secretToken;

        // Flag the account for verification
        req.body.active = false;

        // Create user model
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            secretToken: req.body.secretToken,
            active: req.body.active
        });

        // populate email object for the mailer
        var email = {
            from: 'Arkihive, arkihive@localhost.com',
            to: req.body.email,
            subject: 'Arkihive activation link',
            text: 'Hi,\n\nThank you for Registering!\n\nPlease click on the below link to activate your account\n\non the following page.\n\nhttp://localhost:4000/verify/' + req.body.secretToken,
            html: 'Hi,</br></br>Thank you for Registering!</br></br>Please click on the below link to activate your account</br></br>on the following page.</br></br><a href="http://localhost:4000/verify/?token=' + req.body.secretToken + '">http://localhost:4000/verify</a></br></br>'
        };

        // call the mailer to send mail
        mailer.sendEmail(email);

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
                message: 'Successfully created new user.'
            });
        });
    }
});

router.post('/forgotPassword', function(req, res) {
    User.findOne({ 'email': req.body.email }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({
                success: false,
                message: 'Invalid email ID. Please enter the email ID tagged to your Arkihive account'
            });
        }
        else {
            // populate email object for the mailer
            var email = {
                from: 'Arkihive, arkihive@localhost.com',
                to: req.body.email,
                subject: 'Arkihive change password link',
                text: 'Hi,\n\nPlease click on the below link to change your password http://localhost:4000/changePassword/?email=' + req.body.email,
                html: 'Hi,</br></br>Please click on the below link to change your password.</br></br><a href="http://localhost:4000/changePassword/?email=' + req.body.email + '">http://localhost:4000/changePassword</a></br></br>'
            };

            // call the mailer to send mail
            mailer.sendEmail(email);
            res.json({
                success: true,
                message: 'Email sent successfully. Please check your mail inbox'
            });
        }
    });
});

// save the changed password
app.post('/saveChangePassword', function(req, res) {
    res.setHeader('content-type','text/html');
    User.findOne({ 'email': req.body.email }, function(err, user) {
        if (err) throw err;
        else {
            var passwordPattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
            user.comparePassword(req.body.newpassword, function(err, isMatch) {
                if (req.body.newpassword.match(passwordPattern) && !isMatch) {
                    if (req.body.newpassword === req.body.confirmnewpassword) {
                        user.password = req.body.newpassword;
                        user.save();
                        res.redirect('/');
                    }
                    else {
                        res.send('Please make sure both the fields match.');
                    }
                }
                else {
                    res.send('Please match with the password rules.');
                }
            });
        }
    });
});

// authenticate the user and get a JWT
router.post('/authenticate', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } 
        else if (!user.active) {
            res.send({
                success: false,
                message: 'User account not activated.'
            });
        }
        else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create the token here
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 3600    //seconds
                    });
                    res.json({
                        success: true,
                        token: token,
                        name: user.name
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

// redirect to homepage after account verification
app.post('/verifiedUser', function(req, res) {
    res.redirect('/');
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
// router.use(function(req, res, next) {
//     var token = req.body.token || req.headers['token'];
//     if (token) {
//         jwt.verify(token, config.secret, function(err, decode) {
//             if (err) {
//                 res.status(500).send('Invalid token');
//             }
//             else {
//                 next();
//             }
//         });
//     }
//     else {
//         res.send('Please send a token');
//     }
// });

//////////////////////////////////////////
////////////// WATCH SERVER //////////////
//////////////////////////////////////////

// server to watch the port for runtime code changes
app.listen(port, function() {
    console.log('Night watch guarding the wall on port ' + port + '.');
});