var express         = require('express');
var router          = express.Router();
var bodyParser      = require('body-parser');
var db              = require('./../models');
var authorization   = require('./authorization.js');
var Photo           = db.Photo;
var functions       = require('./functions.js');
module.exports = (function() {
  function _getUsername(req, res) {
    if(req.isAuthenticated()) {
      return req.user;
    }
    return false;
  }

  function _isAuthenticated(req, res, next) {
    if(!req.isAuthenticated) {
      return res.redirect('/login');
    }
    return next();
  }

  function _userSpecificAuthenticated(req, res, next) {
    Photo.findById(req.params.id)
      .then(function(photo) {
        if(req.session.passport.user.id === photo.UserId) {
          return next();
        } else {
          res.redirect('/login');
        }
      });
  }

  function _authenticate(username, password) {
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

  return {
    getUsername : _getUsername,
    isAuthenticated : _isAuthenticated,
    userSpecificAuthenticated : _userSpecificAuthenticated,
    authenticate : _authenticate
  };
}());