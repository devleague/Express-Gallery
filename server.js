const express = require('express');
const bodyParser = require('body-parser');
const CONFIG = require('./config/config.json');
const validate = require('./middleware/validation.js');
const log = require ('./middleware/log.js');
const app = express();
const authenticate = require('./middleware/authentication.js');
const passport = require('passport');
/*
const LocalStrategy = require('passport-local').Strategy;
*/
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const gallery = require('./routes/gallery.js');
const db = require('./models');
const Photo = db.Photo;
const User = db.User;

app.use(express.static('./public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(authenticate.ls);
app.use('/gallery', gallery);

app.use(log);

app.listen(3000, function() {
  db.sequelize.sync();
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login'
}));

let isLoggedIn = (req) => {
  if(req.user !== undefined && req.user !== false) {
    return true;
  }
  return false;
};

app.get('/', function(req, res) {
  //to view list of gallery photos
  Photo.findAll()
  .then((photos) => {
    res.render('gallery', {
      featured: {
        link: 'http://4.bp.blogspot.com/-ASxswpMUlmg/U0xvrC2RgkI/AAAAAAAAHy4/kZy_Aw3fugE/s1600/doge.jpg',
      },
      gallery: photos,
      isLoggedIn: isLoggedIn(req)
    });
  });
});


app.post('/users', (req, res) => {
  //to create a new gallery photo
  User.create({ username: req.body.username,
    password: req.body.password,
    emailaddress: req.body.emailaddress,
    role: 'USER'})
  .then((user) => {
    res.status(200)
    .json({
      success: true
    });
  });
});

app.get('/:page', (req, res) => {
  res.status(404).render('404');
});

module.exports = app;