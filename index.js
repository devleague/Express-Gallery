/*jshint esversion: 6*/

const session = require('express-session');
const express = require('express');
const app = express();
const db = require('./models');
const port = process.envPORT || 3000;
const override = require('method-override');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const galleryRoutes = require('./routes/gallery');
const handlebars = require('express-handlebars');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


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
passport.use(new LocalStrategy (
  function(username, password, done) {
    console.log('runs before serializing');
    User.findOne({
      where: {
        username: username
      }
    })
    .then ( user => {
      if (user === null) {
        console.log('user failed');
        return done(null, false, {message: 'bad username'});
      }
      else {
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


app.use('/gallery', galleryRoutes);
app.use('/login', loginRoutes);

app.listen(3000, () => {
  console.log('server listening on 3000');
  db.sequelize.sync();
});

module.exports = app;