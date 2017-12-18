/*jshint esversion: 6*/

const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');

//passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

//sessions
const session = require('express-session');
const redisStore = require('connect-redis')(session);

//password hashing
const saltRounds = 10;
const bcrypt = require('bcrypt');

//sequelize
const db = require('./models');
const { user } = require('./models');

//create express app
const app = express();

//instantiate body parser
app.use(bodyparser.urlencoded({extended: false}));

//setup sessions
app.use(session({
  store: new redisStore(),
  secret: 'fat_guy_in_a_little_coat',
  resave: false,
  saveUninitialized: true
}));

//setup passport
app.use(passport.initialize());
app.use(passport.session());
