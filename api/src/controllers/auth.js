var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../models/token');

import passport from "passport";
import {BasicStrategy} from "passport-http";

// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        Token.findOne({value: accessToken }, function (err, token) {
            if (err) { return callback(err); }
            // No token found
            if (!token) { return callback(null, false); }
            User.findOne({ _id: token.userId }, function (err, user) {
                if (err) { return callback(err); }
                // No user found
                if (!user) { return callback(null, false); }
                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));

passport.use(new BasicStrategy(
    function(username, password, callback) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return callback(err); }

            // No user found with that username
            if (!user) { return callback(null, false); }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) { return callback(err); }

                // Password did not match
                if (!isMatch) { return callback(null, false); }

                // Success
                return callback(null, user);
            });
        });
    }
));
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
