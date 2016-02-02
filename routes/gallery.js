var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./../models');
var authorization = require('./authorization.js');
var Photo = db.Photo;

function getUsername(req, res) {
  if(req.isAuthenticated()) {
    return req.user;
  }
  return false;
}

function isAuthenticated(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
}

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
    var currentUser = getUsername(req, res);
    Photo.create({
      author: currentUser.username,
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
    var currentUser = getUsername(req, res);
    Photo.create({
      author: currentUser.username,
      UserId: currentUser.id,
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
  })
  .delete(function(req,res){
     Photo.destroy({
      where : {
        id : req.params.id
      }
    })
    .then(function(data) {
      res.redirect('/gallery');
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