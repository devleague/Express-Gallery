/*jshint esversion: 6*/

const session = require('express-session');
const express = require('express');
const app = express();
const db = require('./models');
const port = process.envPORT || 3000;
const override = require('method-override');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const galleryRoutes = require('./routes/gallery');
const handlebars = require('express-handlebars');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = db;

//password hashing
const saltRounds = 10;
const bcrypt = require('bcrypt');


const hbs = handlebars.create({
  extname: 'hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);


app.use(express.static('public'));


app.set('view engine', 'hbs');

app.use(override('_method'));

app.use(bodyParser.urlencoded({extended: false}));


//startup session
app.use(session({
  store: new RedisStore(),
  secret: 'fatGuyInALittleCoat',
  resave: false,
  saveUninitialized: true
}));

//setup passport
app.use(passport.initialize());
app.use(passport.session());

//passport local strategy
passport.serializeUser(function(user, done) {
  console.log('serializing');
// ^ ---------- given from authentication strategy
  // building the object to serialize to save
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  // ^ ---------- given from serializeUser
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user => {
    return done(null, user); // <------- inserts into the request object
  });
});

passport.use(new LocalStrategy (
  function(username, password, done) {
    console.log('runs before serializing');
    User.findOne({
      where: {
        name: username
      }
    })
    .then ( user => {
      if (user === null) {
        console.log('user failed');
        return done(null, false, {message: 'bad username'});
      }
      else {
        console.log(user, user.password);
        bcrypt.compare(password, user.password)
        .then(res => {
          if (res) { return done(null, user); }
          else {
            return done(null, false, {message: 'bad password'});
          }
        });
      }
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }
));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/user/new'
}));





app.use('/gallery', galleryRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log('server listening on 3000');
  db.sequelize.sync({forceSync: true});
});

module.exports = app;