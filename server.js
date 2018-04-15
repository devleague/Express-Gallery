const knex = require('./db/knex');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3003;
const Gallery = require('./db/models/gallery');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('HELLO WORLD');
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
