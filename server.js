/*jshint esversion: 6*/

let express = require('express');
let app = express();
let db = require('./models');
const PORT = process.env.PORT || 1998;


app.get('/', function (req, res) {
  console.log("hello");
  res.send("test");
});

app.listen(PORT, () => {
  db.sequelize.sync();
});