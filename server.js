// require in sequelize connector
var db = require('./models');

// require express
var express = require('express');

// creates a new app
var app = express();

// require path
var path = require('path');

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'views'));

db.sequelize
  .sync()
  .then(function () {
    app.listen(8080, function() {
      console.log('Listening on port 8080');
    });
  });

