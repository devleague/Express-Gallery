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
      res.render('gallery/index', {
        "Photos": data
      });
    })
    .catch(function(error) {
      console.log(error);
    });

  })
  .post(function (req, res) {
    Photo.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
      .then(function (photo) {
        res.json(photo);
      });
});

// router for /gallery/:id
router.route('/:id')
  .get(function(req, res) {
    Photo.find({
      where : {
        id : req.params.id
      }
    })
  .then(function(data) {
      res.render('gallery/single', {
        "Photo": data.dataValues
      });
  })
  .catch(function(err) {
    console.log(err);
    res.send({ 'success': false});
  });
});


// router for /new
router.get('/new', function(req, res) {
  res.render('/gallery/new'); // do we need a callback?
});

module.exports = router;