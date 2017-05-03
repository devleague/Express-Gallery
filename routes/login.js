/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();
const db = require('../models/');

module.exports = router;

router.route('/')
  .get((req,res) => {
    console.log('hit');
    res.send('hit');
  });
