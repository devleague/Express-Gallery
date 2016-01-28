var express = require('express');
var app = express();
var db = require('./models');
var User = db.User;
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
  extended:true
}));

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