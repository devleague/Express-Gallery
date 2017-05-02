/*jshint esversion: 6*/

const express = require('express');
const galleryRouter = express.Router();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const {addPhoto, editPhoto, removePhoto, getAllPhotos, getPhotoById} = require('../DB/photos.js');



galleryRouter.route('/')
  .post((req, res) => {
    const photoInfo = req.body;
    addPhoto(photoInfo)
      .then(photos => {
        res.render('home', photos);
      })
      .catch(error => {
        console.log(error);
      });
  });

galleryRouter.route('/:id')

  .get((req, res) => {

    const photoId = req.params.id;
    console.log('reqParams ', req.params.id);
    if(photoId === 'new') {
        res.render('./gallery/new');
    }
    getPhotoById(photoId)
      .then(photo => {
        console.log('photo ', photo);
        // res.render('photo', {photo});
      })
      .catch(error => {
        console.log(error);
      });
  })

  .put((req, res) => {
    res.send('put works');
  })

  .delete((req, res) => {
    res.send('delete works');
  });

galleryRouter.route('/:id/edit')
  .get((req, res) => {
    res.send('get edit works');
  });







module.exports = galleryRouter;