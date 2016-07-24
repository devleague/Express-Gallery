/*
​*GET /*​: `Returning a list of gallery photos`
​*GET /gallery/4*​: `Single gallery 4`
​*GET /gallery/new*​: `Gallery submission form`
​*POST /gallery*​: `Creating a gallery with {author}, {url}, {description}`
​*PUT /gallery/4*​: `Updating gallery with {new_author}, {new_url}, {new_description}`
​*DELETE /gallery/4*​: `Deleting gallery 4`
*/

console.log("Sanity check");
// Include json file


// Module - Express
var express = require('express');
var app = express();

var db = require('./models');
var Picture = db.Picture;
//console.log('db: ', db);

// Module - Pug/Jade
var pug = require('pug');

// Module - morgan
var morgan = require('morgan');

// Module - body-parser
var bodyParser = require('body-parser');

// Module - querystring
var querystring = require('querystring');

// Module - method-override
var methodOverride = require('method-override');
var connect = require('connect');

// Other variables
var path = require('path');
//var Gallery = require('./gallery');

// Express
app.use(express.static('public'));

// Pug
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

// morgan
app.use(morgan('dev'));

// body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Method-override
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
  //res.render('index');
  //res.send('Returning a list of gallery photos');
  res.redirect('/gallery');
});

app.get('/gallery/new', function (req, res) {
  //console.log(Object.getOwnPropertyNames(req));
  res.render('gallery-new');
});

app.get('/gallery/:id', function (req, res) {
  console.log(req.params);
  console.log(req.params.id);
  console.log(typeof(req.params.id));
  var pageId = req.params.id;
  var idToInteger = parseInt(pageId);

  var galleryData = require("./data/gallery");
  console.log("FOR EACH");
  console.log(galleryData.forEach(function(element, index) {
    console.log("page id " + pageId);
    console.log("GALLERY ELEMENT");
    console.log("Element ID " + element.id);

    console.log(index);

    if (idToInteger === element.id) {
      console.log("*****Match*****");
      console.log("The index");
      console.log(index);
      console.log("The Element");
      console.log(element);
      console.log("***************");
      res.render('gallery-id', element);
    }
  }));
  //res.send('Single gallery ' + req.params.id);
});

app.get('/gallery', function (req, res) {
  //console.log(Object.getOwnPropertyNames(req));
  var galleryData = require("./data/gallery");
  res.render('gallery', {galleryData: galleryData});
});

app.post('/gallery', function (req, res, next) {
  console.log(req.body.url);
  Picture.create({ url: req.body.url, author: req.body.author, description: req.body.description })
    .then(function(picture) {
      res.json(picture);
    });
  });

app.put('/gallery', function (req, res) {

  var locals = req.body;
  console.log("put works");

  res.send('Updating gallery ' + req.params.id + ' with ' + locals.author + ', ' + locals.url +  ', ' + locals.description);
});

app.put('/gallery/:id', function (req, res) {
  var locals = req.body;
  console.log("put works");

  res.send('Updating gallery ' + req.params.id + ' with ' + locals.author + ', ' + locals.url +  ', ' + locals.description);
});

app.delete('/gallery/:id', function (req, res) {
  res.send('Deleting gallery ' + req.params.id);
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Example app listening at http://%s:%s`, host, port);
  db.sequelize.sync();
});