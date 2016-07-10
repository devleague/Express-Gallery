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

var app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

var dataObjects = "";

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello There!'});
  //res.send('Returning a list of gallery photos');
});

app.get('/gallery/:id', function (req, res) {
  //console.log(req.params.id);
  res.send('Single gallery ' + req.params.id);
});

app.get('/gallery/new', function (req, res) {
  //console.log(Object.getOwnPropertyNames(req));
  res.send('Gallery submission form');
});

app.post('/gallery', function (req, res) {

  req.on('data', function(data) {
    console.log("Data coming in");
    dataInput = data.toString();
    dataObjects = querystring.parse(dataInput);
    console.log(dataObjects);
  })

  req.on('end', function() {
    console.log(dataObjects.author);
    console.log(dataObjects.url);
    console.log(dataObjects.description);
    res.send('Creating a gallery with ' + dataObjects.author + ', ' + dataObjects.url + ', ' + dataObjects.description);
  })

});

app.put('/gallery/:id', function (req, res) {

  req.on('data', function(data) {
    console.log("Data coming in");
    dataInput = data.toString();
    dataObjects = querystring.parse(dataInput);
    console.log(dataObjects);
  })

  req.on('end', function() {
    console.log(dataObjects.author);
    console.log(dataObjects.url);
    console.log(dataObjects.description);
    res.send('Updating gallery ' + req.params.id + ' with ' + dataObjects.author + ', ' + dataObjects.url +  ', ' + dataObjects.description);
  })

});

app.delete('/gallery/:id', function (req, res) {
  res.send('Deleting gallery ' + req.params.id);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});