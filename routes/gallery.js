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
    res.render('./partials/gallery_all', {gallery: gallery_object_array});
    });

  })

  .post((req,res)=> {
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
  let path = req.path.split('/')[1];
     db.Gallery.findAll({
      where: {
        id: path
      }
    })
  .then(data => {
    let title = data[0].dataValues.title;
    console.log(title);
    let author = data[0].dataValues.author;
    let link = data[0].dataValues.link;
    let description = data[0].dataValues.description;
    if (data.length === 0){
      res.send(404);
    }
    else{
      console.log(path);
      res.render('./partials/gallery_getId', {
        title: title,
        author: author,
        link: link,
        description: description
      });
     }
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

