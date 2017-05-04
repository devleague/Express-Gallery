/*jshint esversion: 6*/

const path = require('path');
const express = require('express');
const router = express.Router();
const db = require('../models/');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

//sequelize
const { User } = require('../models');

module.exports = router;

router.route('/new')
  .get((req,res) => {
    //console.log('hit');
    res.render('./partials/login');
  })

  .post((req,res) =>{
    console.log(req.body);
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.create({
        name: req.body.name,
        password: hash
      })
      .then( (user) => {
        console.log(user);
        res.redirect('/login');
      });
    });
  });
});

