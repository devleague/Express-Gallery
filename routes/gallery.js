var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./../models');

var Photo = db.Photo;

router.use(bodyParser.urlencoded({
  extended:true
}));



module.exports = router;