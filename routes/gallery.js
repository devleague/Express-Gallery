/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();
const db = require('../models/');
let currentUser;
let currentImage;


module.exports = router;

router.route('/')
  .get((req, res)  =>{
    let user;
    //console.log('USER ID:' +req.user);
    db.Gallery.findAll({
    })
  .then(data => {
    if(req.user !== undefined){
      currentUser = req.user.dataValues.id;
      user = {
       id: req.user.dataValues.id,
       name: req.user.dataValues.name
      };
    }
    if(req.user === undefined) {
      //console.log('wat');
       user = {
        id: 'N/A',
        name: 'Guest'
      };
    }
    //console.log(data);
    let gallery_object_array =[];
    for(var i = 0; i<data.length; i++){
    gallery_object_array.push(data[i].dataValues);
    }
    res.render('./partials/gallery_all', {
      gallery: gallery_object_array,
      current: user
    });
    });

  })

  .post((req,res)=> {
    let loggedIn = req.isAuthenticated();
    if(loggedIn){
      //console.log('USER_ID: '+req.user.dataValues.id);
      //let userId = req.user.dataValues.id;
    console.log('entered post');
    db.Gallery.create({
      title: req.body.title,
      author: req.body.author,
      link: req.body.link,
      description: req.body.description,
      UserId: req.user.dataValues.id
    })
    .then(res.redirect('/gallery'));
    } else {
      res.redirect('/user/new');
    }
  });

router.route('/new')
  .get((req,res)=> {
    res.render('./partials/gallery_new');
  });

router.route('/owned')
  .get((req,res) => {

    db.Gallery.findAll({
      where: {
        UserId: currentUser
      }
    })
    .then(data=>{
      let galleryById = [];
      for(var i=0; i< data.length; i++){
        galleryById.push(data[i].dataValues);
      }
      console.log(galleryById);

    res.render('./partials/gallery_owned', {
      gallery: galleryById,
    });
      //current: user
    });
  });

router.route('/:id')
  .get((req,res) => {
    //console.log(req.user.dataValues.id);
    //console.log(req.user.dataValues.name);
  let path = req.path.split('/')[1];
     db.Gallery.findAll({
      where: {
        id: path
      }
    })
  .then(data => {
    let title = data[0].dataValues.title;
    // console.log(title);
    let author = data[0].dataValues.author;
    let link = data[0].dataValues.link;
    let description = data[0].dataValues.description;
    if (data.length === 0){
      res.send(404);
    }
    else{
      // console.log(path);
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
    let currentImageId;

    console.log('are you working');

    db.Gallery.findAll({
      where: {
        UserId: currentUser
      }
    })
    .then(data =>{
      console.log(data);
    });



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
    res.redirect('/gallery');
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
      // console.log(newPath);
      // console.log(gallery_title);
      res.render('./partials/gallery_edit', {
        id: newPath,
        title: gallery_title
        });
      });
    }
  );

