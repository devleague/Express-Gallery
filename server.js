/*jshint esversion: 6*/

let express = require('express');
let app = express();
const bodyParser = require('body-parser');
let db = require('./models');
let galleryRouter = require('./routes/photos.js');
const PORT = process.env.PORT || 1998;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  console.log(req);//put in index to show all phots later
  res.send("test");
});

app.use('/gallery', galleryRouter);

app.listen(PORT, () => {
  db.sequelize.sync();
});

