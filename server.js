var pug = require('pug');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var querystring = require('querystring');
var Gallery = require('./Gallery');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
  var locals = req.body;
  Gallery.displayAll(function (err, result) {
    res.render('index', {json: result});
  });
});

app.get('/gallery/:id', function (req, res) {
  if(req.params.id === 'new') {
    var success = "Thank you. Picture received.";
    var failure = "Whoops! There was a problem sending your picture.";
    res.render('newPhoto');
  }
  else {
    console.log("id: " + req.params.id);
    Gallery.displayPicture(parseInt(req.params.id), function (err, result) {
      if(err) {
        console.log("Client tried accessing a picture that doesn't exist.");
        res.render('404');
      }
      else {
        res.render('gallery', result);
      }
    });
  }
});

app.post('/gallery', function (req, res) {
    var locals = req.body;
    Gallery.postGallery(locals, function (err, result) {
      if (err) {
        console.log("Client sent picture that already exists.");
        res.send("Picture already exists.");
      }
      else {
        res.render('gallery', result);
      }
    });
});

app.put('/gallery/:id', function (req, res) {
  var locals = req.body;
  Gallery.putGallery(parseInt(req.params.id), locals, function (err, result) {
    if(err) {
      throw err;
    }
    res.render('gallery', result);
  });
});

app.delete('/gallery/:id', function (req, res) {
  var locals = req.body;
  Gallery.deletePicture(parseInt(req.params.id), locals, function (err, result) {
    if(err) {
      console.log("Client tried deleting a picture that doesn't exist.");
      res.render('404');
    }
    else {
      res.render('index', {json: result});
    }
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening on http://%s:%s", host, port);
});