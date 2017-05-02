/*jshint esversion: 6*/

const express = require('express');
const galleryRouter = express.Router();
const bodyParser = require('body-parser');
const {addPhoto, editPhoto, removePhoto, getAllPhotos, getPhotoById} = require('../DB/photos.js');



galleryRouter.route('/')
  .post((req, res) => {
  // /gallery/new will redirect with values in form to this route
    // const photoInfo = req.body;
    // console.log('photoInfo ', photoInfo);
    // addPhoto(photoInfo)
    //   .then(photos => {
    //     res.render('home', {photos});

    //   });

  });

galleryRouter.route('/:id')

  .get((req, res) => {
    const photoId = req.params.id;
    if(photoId === 'new') {
        res.render('../views/gallery/new');
    }
    getPhotoById(photoId)
      .then(photo => {
        console.log('photo ', photo);
        res.render('photo', {photo});
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