const express = require('express');
const Router = express.Router();
const bp = require('body-parser');

// Router.use(bp.urlencoded({ extended: true }));

// get all users
Router.get('/users', (req, res) => {
    Users
    .fetchAll()
    .then( users => {
      res.json(users.serialize());
    })
    .catch( err => {
      res.json(err);
    })
  })
  
  // get all tasks by user_id
  Router.get('/users/:user_id/tasks', (req, res) => {
    const { user_id } = req.params;
    Tasks
      .where({user_id})
      .fetchAll()
      .then( tasks => {
        res.json(tasks.serialize())
      })
      .catch( err => {
        res.json(err);
      })
  })

module.exports = Router;