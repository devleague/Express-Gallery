var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var CONFIG = require('./config');

var db = require('./models');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(passport.initialize());

passport.use(new BasicStrategy(
  function (username, password, done) {
    // example authentication strategy using
    if ( !(username === CONFIG.USER.USERNAME && password === CONFIG.USER.PASSWORD) ) {
      return done(null, false);
    }
    return done(null, CONFIG);
  }
));

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
// now requires authentication from passport
app.get('/gallery/new',
  passport.authenticate('basic', { session : false }),
  function (req, res) {
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
app.get('/gallery/:id/edit',
  passport.authenticate('basic', { session : false }),
  function (req, res) {
    db.Gallery.find({
      where: {
        id: req.params.id
      }
    })
    .then(function (results) {
      res.render('edit', {Galleries:results});
    });
});

// // updates a single gallery photo identified by the :id
// app.put('/gallery/:id', function (req, res) {

// });

// // to delete a single gallery photo identified by the :id
// app.delete('/gallery/:id', function (req, res) {

// });

// logout request! Currently don't work T__T
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

db.sequelize
  .sync()
  .then(function () {
    app.listen(CONFIG.PORT, function() {
      console.log('Server listening on port', CONFIG.PORT);
    });
  });

