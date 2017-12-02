var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// homepage router for admin page
router.get('/', function(req, res, next) {
    res.setHeader('content-type','text/html');
    res.render('error');
});

module.exports = router;