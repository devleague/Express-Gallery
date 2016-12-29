var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var db = require('./models');
var User = db.User;
var methodOverride = require('method-override');
var PORT = process.env.PORT || 8080;
var Gallery = db.Gallery;
var app = express();
var CONFIG = require('./config/config');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var redisStore = require('connect-redis')(session);

//Disable targeted header
app.disable('x-powered-by');

// Add logging middleware to log each request
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: 'keyboard cat',
  store: new redisStore(),
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Serve files in the specified path
app.use(express.static(path.resolve(__dirname, 'public')));

// Passport middleware
passport.use(new LocalStrategy(
  function(username, password, done) {
    return User
    .findOne({where: {username: username, password: password}})
      .then(function (user) {
        if (!user) {
          return done(null, false);
        }
        console.log('success');
        return done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
  })
);

passport.serializeUser(function(user, done) {
  console.log('serializing user...', user);
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing user...', user);
  return done(null, user);
});

// Set file route and template engine
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug'); // pug = jade

visitorCount = 0;

// Route handler for GET

app.get('/', isAuthenticated, function (req, res) {
  Gallery.findAll()
  .then(function (gallery) {
    var id = req.params.id;
    res.render('index', {visitorCount: visitorCount++, galleries: gallery});
  });
});

app.get('/gallery/new', function(req, res) {
  res.render('newGallery');
});
app.get('/gallery/:id', function (req, res, next) {
  Gallery.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (gallery) {
    res.render('gallery', {gallery: gallery, path: req.path});
  });
});
app.get('/gallery/:id/edit',
  isAuthenticated,
  function(req, res) {
  Gallery.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (gallery) {
    res.render('updateForm', {gallery: gallery});
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

// Route handler for POST

app.post('/gallery', function (req, res) {
  Gallery.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }).then(function () {
    res.redirect('/');
  });
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}),
  function(req, res) {
    res.redirect('/');
});

function authenticate(username, password) {
  var CREDENTIALS = CONFIG.CREDENTIALS;
  var USERNAME = CREDENTIALS.USERNAME;
  var PASSWORD = CREDENTIALS.PASSWORD;

  return (username === USERNAME &&
          password === PASSWORD);
}

function isAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
}

app.get('/secret',
  isAuthenticated,
  function (req, res) {
    res.render('secret', {role: req.user.role.toLowerCase()});
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

// Route handler for PUT

app.put('/gallery/:id', function (req, res) {
  Gallery.update({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(function (gallery) {
      res.redirect('/');
  });
});

// Route handler for DELETE

app.delete('/gallery/:id', isAuthenticated, function (req, res) {
  Gallery.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/');
  });
});

// Server

db.sequelize.sync()
  .then(function () {
    var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening on port: ' + port);
  });
});

