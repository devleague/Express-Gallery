var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./../models');

var Photo = db.Photo;

router.use(bodyParser.urlencoded({
  extended:true
}));

// router for /
router.route('/')
  .get(function(req, res) {
    Photo.findAll()
    .then(function(photos) {
      // res.send({success:true}); // this works
      res.render('gallery/index'); // this doesn't work
    })
    .catch(function(error) {
      console.log(error);
    });

  });

// router for /new
router.get('/new', function(req, res) {
  res.render('/gallery/new'); // do we need a callback?
});

module.exports = router;