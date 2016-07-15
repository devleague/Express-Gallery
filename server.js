/*
​*GET /*​: `Returning a list of gallery photos`
​*GET /gallery/4*​: `Single gallery 4`
​*GET /gallery/new*​: `Gallery submission form`
​*POST /gallery*​: `Creating a gallery with {author}, {url}, {description}`
​*PUT /gallery/4*​: `Updating gallery with {new_author}, {new_url}, {new_description}`
​*DELETE /gallery/4*​: `Deleting gallery 4`
*/

console.log("Sanity check");

var pug = require('pug');
var express = require('express');
var querystring = require('querystring');
var path = require('path');
var Gallery = require('./gallery');

var app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
  //res.send('Returning a list of gallery photos');
});


app.get('/gallery/new', function (req, res) {
  //console.log(Object.getOwnPropertyNames(req));
  res.render('gallery-new');
});

app.get('/gallery/:id', function (req, res) {
  //console.log(req.params.id);
  res.send('Single gallery ' + req.params.id);
});

app.get('/gallery', function (req, res) {
  //console.log(Object.getOwnPropertyNames(req));
  res.render('gallery');
});

app.post('/gallery', function (req, res) {

  var locals;

  req.on('data', function(data) {
    console.log("Data coming in");
    locals = querystring.parse(data.toString());
    Gallery.create(locals, function (err, result) {
      if (err) {
        throw err;
      }
    console.log("results" + result);
    console.log("App.post locals" + locals);
    res.render('gallery', result);
    })
    //dataInput = data.toString();
    //locals = querystring.parse(dataInput);
  })

  req.on('end', function() {
    console.log(locals.author);
    console.log(locals.url);
    console.log(locals.description);
    //res.send('Creating a gallery with ' + locals.author + ', ' + locals.url + ', ' + locals.description);
  })

});

app.put('/gallery/:id', function (req, res) {
  var locals;

  req.on('data', function(data) {
    console.log("Data coming in");
    locals = querystring.parse(data.toString());
    console.log(locals);
  })

  req.on('end', function() {
    console.log(locals.author);
    console.log(locals.url);
    console.log(locals.description);
    res.send('Updating gallery ' + req.params.id + ' with ' + locals.author + ', ' + locals.url +  ', ' + locals.description);
  })

});

app.delete('/gallery/:id', function (req, res) {
  res.send('Deleting gallery ' + req.params.id);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Example app listening at http://%s:%s`, host, port);
});