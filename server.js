/*jshint esversion: 6*/

const express = require('express');
const app = express();

const db = require('./models');
const port = process.envPORT || 3000;

app.listen(3000, () => {
  db.sequelize.sync();
});
