var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var db = require('./models');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'views'));

// to view a list of gallery photos
app.get('/', function (req, res) {
  db.Gallery.findAll({})
    .then(function (results) {
      res.render('index', {Galleries:results});
  });
});

// to see a "new photo" form
app.get('/gallery/new', function (req, res) {
  res.render('newPhoto', {});
});

// // to see a single gallery photo
app.get('/gallery/:id', function (req, res) {
  db.Gallery.find({
    where: {
      id: req.params.id
    }
  })
  .then(function (results) {
    res.render('single', {Galleries:results});
  });
});

// to create a new gallery photo
app.post('/gallery/', function (req, res) {
  Gallery.create(req.body)
    .then(function (result) {
      res.redirect('/gallery/'+result.id);
    });
});

// // to see a form to edit a gallery photo identified by the :id
// app.get('/gallery/:id/edit', function (req, res) {

// });

// // updates a single gallery photo identified by the :id
// app.put('/gallery/:id', function (req, res) {

// });

// // to delete a single gallery photo identified by the :id
// app.delete('/gallery/:id', function (req, res) {

// });

db.sequelize
  .sync()
  .then(function () {
    app.listen(8080, function() {
      console.log('Listening on port 8080');
    });
  });

