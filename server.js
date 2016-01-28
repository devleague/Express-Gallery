var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var Gallery = db.Gallery;

// app.use('/', )
app.listen(3000, function() {
  console.log('Server Online on port 3000');
  db.sequelize.sync();
});