var express         = require('express');
var router          = express.Router();
var bodyParser      = require('body-parser');
var db              = require('./../models');
var authorization   = require('./authorization.js');
var Photo           = db.Photo;
var functions       = require('./functions.js');
// var cookieParser    = require('cookie-parser');

// router for /
router.get('/', function(req, res) {
  Photo.findAll()
  .then(function(data) {
    res.render('gallery/index', {
      "Photos": data
    });
  })
  .catch(function(error) {
    console.log(error);
  });
});
router.post('/', functions.isAuthenticated, function (req, res) {
  var currentUser = functions.getUsername(req, res);
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
router.get('/new', functions.isAuthenticated, function(req, res) {
  res.render('gallery/new');
});
router.post('/new', functions.isAuthenticated, function (req, res) {
  var currentUser = functions.getUsername(req, res);
  Photo.create({
    author: currentUser.username,
    UserId: currentUser.id,
    link: req.body.link,
    source: req.body.source,
    description: req.body.description
  })
    .then(function () {
      res.redirect('/gallery');
    });
});

// router for /gallery/:id
// router.route('/:id')
router.get('/:id', function(req, res) {
  // var currentUser = getUsername(req, res);
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
router.put('/:id', functions.isAuthenticated, function(req, res) {
  var currentUser = functions.getUsername(req, res);
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
router.delete('/:id', functions.isAuthenticated, functions.userSpecificAuthenticated, function(req,res){
   Photo.destroy({
    where : {
      id : req.params.id
    }
  })
  .then(function(data) {
    res.redirect('/gallery');
  });
});
// router for :id/edit
router.get('/:id/edit', functions.isAuthenticated, functions.userSpecificAuthenticated, function(req, res) {
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