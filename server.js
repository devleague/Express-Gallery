const knex = require('./db/knex');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3003;
const Gallery = require('./db/models/gallery');
const Author = require('./db/models/author');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('HELLO WORLD');
// });

//get / list of gallery photos
app.get('/', (req, res) => {
  knex
    .select('link')
    .from('classes')
    .then(photos => {
      //  res.send(photos);
      //  res.json(photos.serialize());
      res.render('pages/index', { photos: photos });
    })
    .catch(err => {
      res.status(200).json(err);
    });
});

// get /gallery/:id to see one photo, should include link to delete or edit photo

// get /gallery/new to add a new gallery photo via form

// post /gallery to create a new gallery photo

// get /gallery/:id/edit to edit a photo via form

// put /gallery/:id update a photo

// delete /gallery/:id to delete a photo

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
