var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var bodyParser = require('body-parser');
var BigTexts = require('../app/models/bigtext');
var GetStartedImages = require('../app/models/getStartedImages');
var adminApp = express();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// homepage router for admin page
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Express' });
});

module.exports = router;