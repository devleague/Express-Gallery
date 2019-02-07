const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

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

app.get('/', isAuthenticated, (req, res) => {
  res.redirect('/gallery');
});

app.get('/login', (req, res) => {
  res.status(200);
  return res.render('./login');
});

app.get('/register', (req, res) => {
  res.status(200);
  return res.render('./register');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

/************************
 * POST
************************/

app.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
}));

app.post('/register', (req, res) => {
  return new User({
    username: req.body.username,
    password: req.body.password
  })
    .save()
    .then((user) => {
      res.redirect('/login.html');
    })
    .catch((err) => {
      return res.send('Error Creating account');
    });
});

module.exports = router;