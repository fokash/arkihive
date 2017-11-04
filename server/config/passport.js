var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../app/models/user');
var config = require('../config/main');
var authConfig = require('../config/auth');

module.exports = function(passport) {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = config.secret;
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            }
            else {
                done(null, user);
            }
        });
    }));
};