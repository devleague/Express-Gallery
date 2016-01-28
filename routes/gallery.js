var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./../models');

var Photo = db.Photo;

// router for /
router.route('/')
  .get(function(req, res) {
    Photo.findAll()
    .then(function(data) {
      // res.send({success:true}); // this works
      res.render('gallery/index', {
        "Photos": data
      }); // this doesn't work
    })
    .catch(function(error) {
      console.log(error);
    });

  });

router.post('/gallery', function (req, res) {
  Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
    .then(function (photo) {
      res.json(photo);
    });
});

// router for /new
router.get('/new', function(req, res) {
  res.render('/gallery/new'); // do we need a callback?
});

module.exports = router;