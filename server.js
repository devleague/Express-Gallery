var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./models');
var gallery = require('./routes/gallery.js');
// var User = db.User; // User model does not exist yet

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use('/', gallery);
app.use('/gallery', gallery);

// app.use('/', )
app.listen(3000, function() {
  console.log('Server Online on port 3000');
  db.sequelize.sync();
});