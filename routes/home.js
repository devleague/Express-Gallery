const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../db/models/User');
const bcrypt = require('bcryptjs');

const saltRounds = 12;

/************************
 *  AUTH
************************/

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else { res.redirect('/login'); }
}

/************************
 *  GET
************************/

router.get('/', isAuthenticated, (req, res) => {
  res.redirect('/gallery');
});

router.get('/login', (req, res) => {
  res.status(200);
  return res.render('./login');
});

router.get('/register', (req, res) => {
  res.status(200);
  return res.render('./register');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200);
  res.redirect('/login')
});

/************************
 * POST
************************/

router.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
}));

router.post('/register', (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      res.status(500);
      res.send(err);
    }

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        res.status(500);
        res.send(err);
      }

      return new User({
        username: req.body.username,
        password: hash
      })
        .save()
        .then((user) => {
          console.log(user);
          res.redirect('/login');
        })
        .catch((err) => {
          return res.send('Error Creating account');
        });
    });
  });
});

module.exports = router;