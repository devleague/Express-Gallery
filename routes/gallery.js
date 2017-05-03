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
    let gallery_object_array =[];
    for(var i = 0; i<data.length; i++){
    gallery_object_array.push(data[i].dataValues);
    }
    console.log(gallery_object_array);
    res.render( './partials/gallery_all', {gallery: gallery_object_array});
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
    .then(res.redirect(301, '/gallery'));
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
    res.render('./partials/gallery_getId');
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
    res.redirect(301, '/gallery');
  });

  router.route('/:id/edit')
  .get((req,res) => {
    let path = (req.path.split('/'));
    path.pop();
    let newPath = path.join('');
    db.Gallery.findAll({
      where: { id: newPath}
    })
    .then(data =>{
      let gallery_title = data[0].dataValues.title;
      console.log(newPath);
      console.log(gallery_title);
      res.render('./partials/gallery_edit', {
        id: newPath,
        title: gallery_title
        });
      });
    }
  );

