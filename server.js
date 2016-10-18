var express = require('express');
const bodyParser = require('body-parser');
var app = express();

var db = require('./models');
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(3000, function() {
  db.sequelize.sync();
});

app.get('/', function(req, res) {
  //to view list of gallery photos
  User.findAll()
    .then((users) => {
      res.json(users);
    });
});

app.get('/gallery/:id', function(req, res) {
  //to view single of gallery photo
  User.findAll()
    .then((users) => {
      res.json(users);
    });
});

app.get('/gallery/new', function(req, res) {
  //to view new photo form
  User.findAll()
    .then((users) => {
      res.json(users);
    });
});


app.post('/gallery', (req, res) => {
  //to create a new gallery photo
  Task.create({ title: req.body.title, UserId: 1 })
    .then((task) => {
      res.json(task);
    });
});


app.get('/gallery/:id/edit', function(req, res) {
  //to edit selected photo in gallery
  User.findAll()
    .then((users) => {
      res.json(users);
    });
});

app.put('/gallery/:id', function(req, res) {
  //to update selected photo in gallery
  User.findAll()
    .then((users) => {
      res.json(users);
    });
});

app.delete('/gallery/:id', function(req, res) {
  //to delete selected photo in gallery
  User.findAll()
    .then((users) => {
      res.json(users);
    });
});