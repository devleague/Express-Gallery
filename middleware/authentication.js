const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('../config/config.json');

passport.use(new LocalStrategy((username, password, done) => {
  const { USERNAME, PASSWORD } = CONFIG.CREDENTIALS;
  const isAuthenticated = (username === USERNAME && password === PASSWORD);

  if(!isAuthenticated) {
    return done(null, false);
  }
  const user = {
    name: 'Gallery Admin',
    role: 'ADMIN',
    id: 1
  };
  return done(null, user);
}));

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

module.exports = isAuthenticated;