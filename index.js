/*jshint esversion: 6*/

const express = require('express');
const app = express();
const db = require('./models');
const port = process.envPORT || 3000;
const override = require('method-override');
const bodyParser = require('body-parser');
const galleryRoutes = require('./routes/gallery');

app.use(bodyParser.urlencoded({extended: false}));
//app.use('/gallery', galleryRoutes);

// router.route('/')
  // app.get('/', (req, res) =>{
app.use('/gallery', galleryRoutes);


app.listen(3000, () => {
  console.log('server listening on 3000');
  db.sequelize.sync();
});
