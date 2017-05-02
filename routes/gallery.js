/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();
const db = require('../models/');


module.exports = router;

router.route('/')
  .get((req, res) =>{
    res.send('Hello World');
  })

  .post((req,res)=> {
    // console.log(db);
    db.Gallery.create({
      title: req.body.title,
      author: req.body.author,
      link: req.body.link,
      descriptuion: req.body.descriptuion
    })
    .then(res.send('Created!'));
  });

router.route('/:id')
  .get((req,res) => {
    res.send('fake id');
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
