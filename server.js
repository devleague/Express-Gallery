/*
​*GET /*​: `Returning a list of gallery photos`
​*GET /gallery/4*​: `Single gallery 4`
​*GET /gallery/new*​: `Gallery submission form`
​*POST /gallery*​: `Creating a gallery with {author}, {url}, {description}`
​*PUT /gallery/4*​: `Updating gallery with {new_author}, {new_url}, {new_description}`
​*DELETE /gallery/4*​: `Deleting gallery 4`
*/

console.log("Sanity check");
var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('Returning a list of gallery photos');
});

app.get('/gallery/4', function (req, res) {
  res.send('Single gallery 4');
});

app.get('/gallery/new', function (req, res) {
  res.send('Gallery submission form');
});

app.post('/gallery', function (req, res) {
  res.send('Creating a gallery with {author}, {url}, {description}');
});

app.put('/gallery/4', function (req, res) {
  res.send('Updating gallery with {new_author}, {new_url}, {new_description}');
});

app.delete('/gallery/4', function (req, res) {
  res.send('Deleting gallery 4');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});