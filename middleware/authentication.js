const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('../config/config.json');
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

 const ls = new LocalStrategy((username, password, done) => {
   User.findAll({
    attributes: ['username', 'password', 'role', 'id'],
    where: {
      username: username
    }
  }).then((user) => {
    if(user.length < 1) {
      return done(null, false);
    }
    let [u] = user;
    let res = bcrypt.compareSync(password, u.dataValues.password);
    console.log(password, res);
    if(res === true) {
      return done(null, {
        username: u.dataValues.username,
        role: u.dataValues.role,
        id: u.dataValues.id
      });
    } else {
      return done(null, false);
    }
  })
  .catch((err) => {
    return done(null, false);
  });

 });

 passport.serializeUser((user, done) => {
  console.log('hit serializeUser');
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('hit deserialize user');
  return done(null, user);
});

passport.use(ls);

const isAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  } else {
    return next();
  }
};

module.exports = {
  isAuthenticated: isAuthenticated,
  ls: ls
};