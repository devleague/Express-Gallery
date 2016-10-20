const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const validate = require('../middleware/validation.js');
const authenticate = require('../middleware/authentication.js');
//const authenticate = require('../middleware/authentication.js');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const db = require('../models');
const Photo = db.Photo;

let isLoggedIn = (req) => {
  if(req.user !== undefined && req.user !== false) {
    return true;
  }
  return false;
};

let renderById = (req, res, id) => {
  Photo.findById(id)
  .then((photo) => {
    //add a WHERE clause here for hashtags
    Photo.findAll({
      limit: 3,
        where: {
          id: {
            $ne:id
          }
        }
      })
    .then((related) => {
      res.render('photo', {
        user: req.user,
        id: photo.id,
        title:photo.title,
        link: photo.link,
        description: photo.description,
        author: photo.author,
        hashtags: photo.hashtags,
        //needs to be edited
        relatedPhotos: related
      });
    })
    .catch((error) => {
      console.log('catch on findall:', error);
      res.status(404).render('404');
    });
  })
  .catch((error) => {
    console.log('catch on findbyid');
    res.status(404).render('404');
  });
};
router.route('/')
  .get((req, res) => {
    //to view list of gallery photos
    Photo.findAll()
    .then((photos) => {
      res.render('gallery', {
        featured: {
          link: 'http://4.bp.blogspot.com/-ASxswpMUlmg/U0xvrC2RgkI/AAAAAAAAHy4/kZy_Aw3fugE/s1600/doge.jpg',
        },
        gallery: photos,
        isLoggedIn: isLoggedIn(req)
      });
    });
  })
  .post(validate, authenticate, (req, res) => {
    //to create a new gallery photo
    Photo.create({ title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      link: req.body.link,
      hashtags: req.body.hashtags,
      UserId: 2 })
    .then((photos) => {
      res.status(200)
      .json({
        success: true
      });
    });
  });

router.route('/new')
  .get(authenticate, (req, res) => {
    //to view new photo form
    //we will pass res.render an object with the user's info later
    res.render('new', {
      title: 'Untitled',
      author: 'Your name here',
      link: 'URL Link to Photo',
      description: 'Your text here',
      hashtags: 'Your tags here'
    });
  });

router.route('/:id')
  .get((req, res) => {
    //to view single of gallery photo
    let id = parseInt(req.params.id);
    renderById(req, res, id);
  })
  .post(validate, authenticate, (req, res) => {
    //to update selected photo in gallery
    if(req.body._method === 'PUT'){
      let id = parseInt(req.params.id);
      Photo.findById(id)
      .then((photo) => {
        photo.update({
          id: id,
          title: req.body.title || photo.title,
          description: req.body.description || photo.description,
          author: req.body.author || photo.author,
          link: req.body.link || photo.link,
          hashtags: req.body.hashtags || photo.hashtags
        })
        .then((photo) => {
        //add a WHERE clause here for hashtags
          renderById(req, res, id);
        });
      })
      .catch((error) => {
        res.status(404).render('404');
      });
    } else {
      res.sendStatus(405);
    }
  })
  .put(validate, authenticate, (req, res) => {
    //to update selected photo in gallery
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      photo.update({
        title: req.body.title || photo.title,
        description: req.body.description || photo.description,
        author: req.body.author || photo.author,
        link: req.body.link || photo.link,
        hashtags: req.body.hashtags || photo.hashtags
      })
      .then((photo) => {
        res.status(200)
        .json({
          success: true
        });
      });
    });
  })
  .delete(authenticate, (req, res) => {
    //to delete selected photo in gallery
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      photo.destroy();
      res.status(200)
      .json({
        success: true
      });
    })
    .catch((error) => {
      res.status(404).render('404');
    });
  });

router.route('/:id/edit')
  .get(authenticate, (req, res) => {
    //to edit selected photo in gallery
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      res.render('edit', {
        id: id,
        title: photo.title,
        link: photo.link,
        description: photo.description,
        author: photo.author,
        hashtags: photo.hashtags
      });
    })
    .catch((error) => {
      res.status(404).render('404');
    });
  });

  router.route('/:id/delete')
  .get(authenticate, (req, res) => {
    //to edit selected photo in gallery
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      photo.destroy();
      res.redirect('/');
    })
    .catch((error) => {
      res.status(404).render('404');
    });
  });

router.route('/:page')
.get((req, res) => {
  res.status(404).render('404');
});

module.exports = router;