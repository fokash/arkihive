var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../app/models/user');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// homepage router for admin page
router.get('/', function(req, res, next) {
    res.setHeader('content-type','text/html');
    User.findOne({ 'secretToken': req.param('token') }, function(err, user) {
        if (err || !user) {
            res.render('error');
        }
        else {
            user.active = true;
            user.secretToken = '';

            user.save();
            res.render('verify');
        }
    });
});

module.exports = router;