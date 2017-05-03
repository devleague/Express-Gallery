'use strict';
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      db = require('./models'),
      galleryRoute  = require('./routes/gallery.js'),
      passport = require('passport'),
      session = require('express-session'),
      LocalStrategy = require('passport-local').Strategy,
      User = db.User,
      bcrypt = require('bcryptjs'),
      flash = require('connect-flash')
      ;

  app.set('view engine', 'jade');
  app.set('views', './views');





app
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(session({
    secret : "chocolate",
    resave : true,
    saveUninitialized : true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .use(express.static('public'))
  .use('/gallery', galleryRoute)
  ;


  passport.use(new LocalStrategy (
    function(username, password, done) {
      User.findAll({
        where : {
          username : username
        }
      })
      .then(function(user){
        if( user.length === 0 ){
          return done(null, false, {message: 'Username does not exist'});
        }
        if( bcrypt.compareSync(password, user[0].password) === false){
          return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
      });


    }

));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});


app.get('/login', function(req, res) {
  res.render('photos/login', {errormessage: req.flash('error')[0]});
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/login',
  passport.authenticate('local', {
  successRedirect : '/gallery',
  failureRedirect : '/login',
  failureFlash: true
  })
);

app.get('/signUp', function(req, res){
  res.render('photos/signup', {errormessage: req.flash('regError')[0]});
});

app.post('/signUp', function(req,res){

  User.findAll({
    where : {
      username : req.body.username
    }
  })
  .then(function(user){
    if(user.length > 0){
      req.flash('regError', 'Username already exists');
      res.redirect('/signUp');
    }
    else {
      User.create({
        username: req.body.username,
        password: req.body.password
      })
      .then(function(){
        res.redirect('/gallery');
      });
    }
  });
});

app.listen(3000, function() {
  db.sequelize.sync();
  console.log('server started at 3000!');
});