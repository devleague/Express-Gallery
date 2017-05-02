/*jshint esversion: 6*/

const express = require('express');
const app = express();
const db = require('./models');
const port = process.envPORT || 3000;
const override = require('method-override');
const bodyParser = require('body-parser');
const galleryRoutes = require('./routes/gallery');
const handlebars = require('express-handlebars');

const hbs = handlebars.create({
  extname: 'hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.use(override('_method'));

app.use(bodyParser.urlencoded({extended: false}));
//app.use('/gallery', galleryRoutes);

// router.route('/')
  // app.get('/', (req, res) =>{
app.use('/gallery', galleryRoutes);


app.listen(3000, () => {
  console.log('server listening on 3000');
  db.sequelize.sync();
});

module.exports = app;