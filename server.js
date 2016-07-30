var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookie = require('cookie-parser');
var db = require('./models');
var methodOverride = require('method-override');
var PORT = process.env.PORT || 8080;
var Gallery = db.Gallery;
var app = express();

//Disable targeted header
app.disable('x-powered-by');

// Add logging middleware to log each request
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookie());
app.use(methodOverride('_method'));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Serve files in the specified path
app.use(express.static(path.resolve(__dirname, 'public')));

// Set file route and template engine
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug'); // pug = jade

visitorCount = 0;

// Route handler for GET

app.get('/', function (req, res) {
  Gallery.findAll()
  .then(function (gallery) {
    var id = req.params.id;
    res.render('index', {visitorCount: visitorCount++, galleries: gallery});
  });
});

app.get('/gallery/new', function (req, res) {
    res.render('newGallery');
});

app.get('/gallery/:id', function (req, res, next) {
  Gallery.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (gallery) {
    res.render('gallery', {gallery: gallery});
  });
});

app.get('/gallery/update/:id', function (req, res) {
  var id = req.params.id;
  res.render('updateForm', {id:id});
});

// Route handler for POST

app.post('/gallery', function (req, res) {
  Gallery.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }).then(function () {
    res.redirect('/');
  });
});

// Route handler for PUT

app.put('/gallery/:id', function (req, res) {

  var newVal = {
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  };

  var selector = {
    where: {id: req.params.id},
    returning: true
  };
  Gallery.update (newVal, selector)
    .then(function (gallery) {
      res.redirect('/');
  });
});

// Route handler for DELETE

app.delete('/gallery/:id', function (req, res) {
  Gallery.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (gallery) {
    res.redirect('/');
    /*res.render('index', {visitorCount: visitorCount++, galleries: gallery});*/
  });
});

// Server

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();
  console.log('Listening on port: ' + port);
});
