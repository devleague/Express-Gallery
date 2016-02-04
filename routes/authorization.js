var express         = require('express');
var passport        = require('passport');
var LocalStrategy   = require('passport-local');
var router          = express.Router();
var db              = require('./../models');
var User            = db.User;
var functions       = require('./functions.js');
// var cookieParser    = require('cookie-parser');
var bcrypt = require('bcrypt');

passport.use( new LocalStrategy (
  function(username, password, done) {
    return User.find({
      where : {
        username : username
      }
    })
    .then(function(user){
      var isAuthenticated = (username === user.username && password === user.password);
      if(!isAuthenticated) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(function(err) {
      console.log(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  return done(null,user); // CHANGE THIS TO user.id LATER
});

passport.deserializeUser(function(user, done) {// CHANGE user TO id LATER
  // User.findById(id, function(err, user) {
  //   done(err, user); // COMMENT THIS IN LATER
  // });
  return done(null, user);
});

router.get('/users', function (req, res) {
  res.render('users');
});

router.post('/users', function (req, res) {
  if(req.body.password === req.body.verifyPassword) {
    User.create({
    username: req.body.username,
    email_address: req.body.email_address,
    password : req.body.password
  })
    .then(function (user) {
      return res.redirect('/gallery');
    });
  } else {
    res.redirect('/users');
  }
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/secret',
  failureRedirect : '/login',
}));

router.get('/secret', functions.isAuthenticated, function(req, res) {
  req.user.role = 'ADMIN';
  res.render('secret', {role: req.user.role.toLowerCase()
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;