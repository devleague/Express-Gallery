var express = require('express');
var path = require('path');
var querystring = require('querystring');
var Gallery = require('./Gallery');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookie = require('cookie-parser');
var PORT = process.env.PORT || 8080;

// Express app
var app = express();
var json = path.resolve('data', 'gallery.json');

app.disable('x-powered-by');

// Add logging middleware to log each request
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookie());

// Serve files in the specified path
// Only calls next() if path doesn't match static directory
/*app.use(express.static(public));*/

// Set file route and template engine
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug'); // pug = jade

// Middleware handles remaining requests for non-static files



visitorCount = 0;

// Route handler for GET

app.get('/', function (req, res) {
  var content = require(json);
  res.render('index', {visitorCount: visitorCount++, galleries: content});
});

app.get('/gallery/:id', function (req, res, next) {
  var stringData = [];
  var id = req.params.id;
  console.log(req.params.id);

  var findGallery = require(json);
  console.log(findGallery[id]);

  stringData.push(findGallery[id]);

  res.render('gallery', {galleries: stringData, id: id});
});

app.get('/gallery/new', function (req, res) {
    res.render('newGallery');
});

// Route handler for POST

app.post('/gallery', function (req, res) {
  req.on('data', function (data) {
    var locals = querystring.parse(data.toString());
    console.log(locals);
    Gallery.create(locals, function (err, result) {
      if (err) {
        throw err;
      }
      else {
        console.log(result);
        res.render('gallery', result);
      }
    });
  });
});

  // Server

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening on port: ' + port);
});
