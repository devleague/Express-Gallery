/*jshint esversion: 6*/

const express = require('express');
const galleryRouter = express.Router();
const bodyParser = require('body-parser');
const {addPhoto, editPhoto, removePhoto, getAllPhotos, getPhotoById} = require('../DB/photos.js');



galleryRouter.route('/')
  .post((req, res) => {
    addPhoto()
    res.send('route works');
  });

galleryRouter.route('/:id')

  .get((req, res) => {
    if(req.params.id === 'new') {
      res.render('new');
      return;
    }
    res.send('get works');
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