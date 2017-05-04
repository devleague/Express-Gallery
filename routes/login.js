/*jshint esversion: 6*/

const path = require('path');
const express = require('express');
const router = express.Router();
const db = require('../models/');
const bodyParser = require('body-parser');

const app = express();

//sequelize
const { User } = require('../models');

module.exports = router;

router.route('/')
  .get((req,res) => {
    console.log('hit');
    res.render('./partials/login');
  })

  .post((req,res) =>{
    console.log(req.body);
    db.User.create({
      name: req.body.username,
      password: req.body.password,
    });
    res.send('user created');
  });

router.route('/auth')
