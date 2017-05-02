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

router.route('/:id')
  .get((req,res) => {
  console.log(typeof req.path);
  let path = req.path.split('/')[1];
  console.log(path);
     db.Gallery.findAll({
      where: {
        id: path
      }
    })
  .then(data => {
    console.log(data);
    res.send('gotem');
    });

  })

  .put((req, res) => {
    res.send('edit id');
  })

  .delete((req, res) => {
    res.send('delete id');
  });


  router.route('/:id/edit')
  .get((req,res) => {
    res.send('edit id');
  });

router.route('/new')
  .get((req,res)=> {
    res.send('New pics here');
  });
