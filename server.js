var express = require('express');
var app = express();
var methodOverride = require('method-override');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./models');
var gallery = require('./routes/gallery.js');
var Photo = db.Photo;
var User = db.User;


app.use(bodyParser.urlencoded({
  extended : true
}));


// for jade
app.set('view engine', 'jade');
app.set('views', 'templates');

app.use(methodOverride(function(req, res) {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/gallery', gallery);

app.post('/users', function (req, res) {
  User.create({ username: req.body.username })
    .then(function (user) {
      res.json(user);
    });
});

// app.use('/', )
app.listen(3000, function() {
  console.log('Server Online on port 3000');
  db.sequelize.sync();
});