// import express from 'express';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import expresshbs from 'express-handlebars';
// import expressValidator from 'express-validator';
// import flash from 'connect-flash';
// import session from 'express-session';
// import passport from 'passport';
// import localStrategy from 'passport-local';
// import mongoose from 'mongoose';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expresshbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');

mongoose.connect('mongodb://localhost/arkihive');
var db = mongoose.connection;

// init app
var app = express();

// setting view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expresshbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

// Connect Flash
app.use(flash());

// Global vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', routes);
app.use('/users', users);

//Set port
app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});