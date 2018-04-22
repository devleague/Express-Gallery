const knex = require('./db/knex');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3003;
const Gallery = require('./db/models/gallery');
const Author = require('./db/models/author');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// app.get('/', (req, res) => {
//   res.send('HELLO WORLD');
// });

//get / list of gallery photos
app.get('/', (req, res) => {
  knex
    .select()
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
// get /gallery/new to add a new gallery photo via form
//must be before :id
app.get('/gallery/new', (req, res) => {
  res.render('pages/new');
});

// get /gallery/:id to see one photo, should include link to delete or edit photo
app.get('/gallery/:id', (req, res) => {
  let photoId = parseInt(req.params.id);
  knex
    .select()
    .from('classes')
    .where('photo_id', photoId)
    .then(detail => {
      knex
        .select()
        .from('classes')
        .then(photos => {
          //  console.log(detail);
          res.render('pages/detail', {
            detail: detail[0],
            photos: photos
          });
        });
    })
    .catch(err => {
      res.sendStatus(500);
    });
});
app.get('/gallery/:id/edit', (req, res) => {
  let photoId = parseInt(req.params.id);
  knex
    .select()
    .from('classes')
    .where('photo_id', photoId)
    .then(photo => {
      console.log(photo);
      res.render('pages/edit', {
        photo: photo[0]
      });
    });
});

// post /gallery to create a new gallery photo
app.post('/gallery', (req, res) => {
  const newPhoto = {
    author: req.body.Author,
    class: req.body.Class,
    link: req.body.Link,
    desc: req.body.Description
  };
  Gallery.forge(newPhoto)
    .save()
    .then(detail => {
      knex
        .select()
        .from('classes')
        .then(photos => {
          res.render('pages/index', { photos: photos });
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// get /gallery/:id/edit to edit a photo via form
app.put('/gallery/:id', (req, res) => {
  let photoId = parseInt(req.params.id);
  const updatedPhoto = {
    author: req.body.Author,
    class: req.body.Class,
    link: req.body.Link,
    desc: req.body.Description
  };
  Gallery.where('photo_id', photoId)
    .fetch()
    .then(photo => {
      return photo.save(updatedPhoto);
    })
    .then(photo => {
      console.log('RESULT', photo);
      knex
        .select()
        .from('classes')
        .then(photos => {
          console.log(photos);
          res.render('pages/index', { photos: photos, photo: photo });
        });
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    });
});
// delete /gallery/:id to delete a photo // put /gallery/:id update a photo
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
