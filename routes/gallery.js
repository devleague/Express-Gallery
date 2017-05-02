/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();
const db = require('../models/');


module.exports = router;

router.route('/')
  .get((req, res)  =>{
    db.Gallery.findAll({
    })
  .then(data => {
    //console.log(data);
    res.send('gotem');
    });

  })

  .post((req,res)=> {
    // console.log(db);
    db.Gallery.create({
      title: req.body.title,
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
    .then(res.send('Created!'));
  });

router.route('/new')
  .get((req,res)=> {
    res.render('./partials/gallery_new');
  });

router.route('/:id')
  .get((req,res) => {
  console.log(typeof req.path);
  let path = req.path.split('/')[1];
     db.Gallery.findAll({
      where: {
        id: path
      }
    })
  .then(data => {
    //console.log(data);
    res.send('gotem');
    });
  })

  .put((req, res) => {
    let path = req.path.split('/')[1];
    db.Gallery.update({
      title: req.body.title,
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    }, {
      where: {
        id: path
      }
    })
    .then(data => {
      //console.log('wat'+data);
      res.send('posted');
    });
  })

  .delete((req, res) => {
    let path = req.path.split('/')[1];
    db.Gallery.destroy({
      where: {
        id: path
      }
    });
    res.send('Deleted');
  });

  router.route('/:id/edit')
  .get((req,res) => {
    res.render('./partials/gallery_edit');
  });

