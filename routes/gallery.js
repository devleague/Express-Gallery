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


// router for /new
router.route('/new')
  .get(function(req, res) {
    res.render('gallery/new');
  })
  .post(function (req, res) {
    Photo.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
      .then(function () {
        res.redirect('/gallery');
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
})
  .put(function(req, res) {
    console.log('HEERREEE???');
    Photo.findById(req.params.id)
    .then(function(data) {
      data.update({
        link : req.body.link,
        description : req.body.description,
        author : req.body.author
      })
    .then(function (data) {
      res.render('gallery/single', {
        "Photo" : data.dataValues
      } );
    });
    })
    .catch(function(err) {
      console.log(err);
      res.send({'success': false});

    });
  });

router.get('/:id/edit', function(req, res) {
  Photo.find({
      where : {
        id : req.params.id
      }
    })
  .then(function(data) {
    res.render('gallery/edit', {
      "Photo": data.dataValues
    });
  });
});

module.exports = router;