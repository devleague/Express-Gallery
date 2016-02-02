var express = require('express');
var passport = require('passport');
var LocalStrategy   = require('passport-local');
var router          = express.Router();
var db              = require('./../models');
var User            = db.User;

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
        // res.send({'success' : false});
      });
    // var authenticatedUser = authenticate(username, password);
    // console.log(authenticatedUser);
    // var isAuthenticated = authenticatedUser.isAuthenticated;
    // console.log(isAuthenticated);
    // if(!isAuthenticated) {
    //   return done(null, false);
    // }
    // var user = authenticatedUser.user;
    // console.log('not fail');
    // return done(null, user);
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
  User.create({ username: req.body.username })
    .then(function (user) {
      res.json(user);
    });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/secret',
  failureRedirect : '/login',
}));

router.get('/secret', isAuthenticated, function(req, res) {
  console.log(req.user);
  req.user.role = 'ADMIN';
  res.render('secret', {role: req.user.role.toLowerCase()
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

function getUsername(req, res) {
  if(req.isAuthenticated()) {
    return req.user;
  }
  return false;
}

function isAuthenticated(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
}

function authenticate(username, password) {
  return User.find({
    where : {
      username : username
    }
  })
  .then(function(user){
    var isAuthenticated = (username === user.username && password === user.password);
    return {
      isAuthenticated : isAuthenticated,
      user : user
    };
  })
  .catch(function(err) {
    console.log(err);
    // res.send({'success' : false});
  });
  // var CREDENTIALS = CONFIG.CREDENTIALS;
  // var USERNAME = CREDENTIALS.USERNAME;
  // var PASSWORD = CREDENTIALS.PASSWORD;

  // return (username === USERNAME && password === PASSWORD);
}

module.exports = router;