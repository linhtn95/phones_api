const mongoose = require('mongoose');
const Users = require('../models/user');

module.exports.controller = function (app, passport) {
    
    //Sign in
    app.get('/signin', (req, res) => {
        res.render('signin', { message: req.flash('signinMessage') });
    }); 

    //Sign up
    app.get('/signup', (req, res) => {
        res.render('signup', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //User profile
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {user: req.user});
    });

    //Logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}