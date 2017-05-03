// ** GLOBAL VARIABLES ** \\
var express         = require('express');
var app             = express();
var passport        = require('passport');
var session         = require('express-session');
var CONFIG          = require('./config.js');
var methodOverride  = require('method-override');
var bodyParser      = require('body-parser');
// var cookieParser    = require('cookie-parser');
var db              = require('./models');
var gallery         = require('./routes/gallery.js');
var authorization   = require('./routes/authorization.js');
var functions       = require('./routes/functions.js');
var Photo           = db.Photo;
var User            = db.User;

// for jade
app.set('view engine', 'jade');
app.set('views', 'templates');


// USE
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended : true
}));

// app.use(cookieParser());

app.use(methodOverride(function(req, res) {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// require to initalize session and passport
app.use(session(CONFIG.SESSION));
app.use(passport.initialize());
app.use(passport.session());

app.use(authorization);

// ROUTES
app.get('/', function(req,res) {
  res.redirect('/gallery');
});
app.use('/gallery', gallery);

app.listen(3000, function() {
  console.log('Server Online on port 3000');
  db.sequelize.sync();
});

