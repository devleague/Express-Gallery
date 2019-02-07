const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const galleryRouter = require('./routes/gallery');
const homeRouter = require('./routes/home');

const User = require('./db/models/User');
const Gallery = require('./db/models/Gallery');
const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'bulbasaur';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: ENV === 'production' }
}));
app.use(express.static('public'));
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('views', __dirname + '/views/templates');
app.set('view engine', '.hbs');
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  new User({ id: user.id }).fetch()
    .then(dbUser => {
      dbUser = dbUser.toJSON();
      return done(null, {
        id: dbUser.id,
        username: dbUser.username
      });
    })
    .catch((err) => {
      return done(err);
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
  return new User({ username: username }).fetch()
    .then(dbUser => {
      dbUser = dbUser.toJSON();

      if (dbUser === null) {
        return done(null, false, { message: 'bad username or password' });
      } else if (password === user.password) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'bad username or password' });
      }
    })
    .catch(err => {
      return done(err);
    });
}));

app.use('/gallery', galleryRouter);
app.use('/', homeRouter);


const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});