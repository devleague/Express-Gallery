const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('../config/config.json');
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

const ls = new LocalStrategy((username, password, done) => {
  User.findAll({
    attributes: ['username', 'password', 'id'],
    where: {
      username: username
    }
  }).then((user) => {
    if(user.length < 1) {
      return done(null, false);
    }
    let [u] = user;
    bcrypt.compare(password, u.dataValues.password, (err, res) => {
      console.log(password, res);
      if(res === true) {
        console.log("logged in");
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
  .catch((err) => {
    return done(null, false);
  });

});

passport.use(ls);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

const isAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  } else {
    return next();
  }
};

module.exports = {isAuthenticated, ls};