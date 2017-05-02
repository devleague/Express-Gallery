/*jshint esversion: 6*/

const express = require('express');
const galleryRouter = express.Router();
const bodyParser = require('body-parser');



galleryRouter.route('/')
  .post((req, res) => {
    res.send('route works');
  });


module.exports = galleryRouter;