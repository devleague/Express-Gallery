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
  if (req.isAuthenticated()) { return res.redirect('/gallery'); }

  res.status(200);
  return res.render('./login', {
    message: req.flash('error'),
    user: true
  });
});

router.get('/register', (req, res) => {
  res.status(200);
  return res.render('./register', {
    message: req.flash('error'),
    user: true
  });
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
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/register', (req, res) => {
  User.where({ username: req.body.username }).fetch()
    .then((dbUser) => {
      if (dbUser) {
        req.flash('error', 'That username already exists')
        return res.redirect('/register');
      }

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
            password: hash,
            role_id: 2
          })
            .save()
            .then((user) => {
              res.redirect('/login');
            })
            .catch((err) => {
              req.flash('error', 'Error creating account')
              return res.redirect('/register');
            });
        });
      });
    });
});

module.exports = router;