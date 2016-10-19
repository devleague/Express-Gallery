const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const validate = require('./middleware/validation.js');
const log = require ('./middleware/log.js');
const app = express();
const db = require('./models');
const Photo = db.Photo;
const User = db.User;

app.use(express.static('./public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(log);

app.listen(3000, function() {
  db.sequelize.sync();
});

let renderById = (res, id) => {
  Photo.findById(id)
  .then((photo) => {
    //add a WHERE clause here for hashtags
    Photo.findAll({
      limit: 3,
        where: {
          id: {
            $ne:id
          }
        }
      })
    .then((related) => {
      res.render('photo', {
        title:photo.title,
        link: photo.link,
        description: photo.description,
        author: photo.author,
        hashtags: photo.hashtags,
        //needs to be edited
        relatedPhotos: related
      })
      .catch((error) => {
        res.status(404).render('404');
      });
    })
    .catch((error) => {
      res.status(404).render('404');
    });
  })
  .catch((error) => {
    res.status(404).render('404');
  });
};

app.get('/', function(req, res) {
  //to view list of gallery photos
  Photo.findAll()
  .then((photos) => {
    res.render('gallery', {
      featured: {
        link: 'https://pbs.twimg.com/media/B6mfb6nIYAA2Cox.jpg',
      },
      gallery: photos
    });
  });
});


app.get('/gallery/new', function(req, res) {
  //to view new photo form
  //we will pass res.render an object with the user's info later
  res.render('new', {
    title: 'Untitled',
    author: 'Your name here',
    link: 'URL Link to Photo',
    description: 'Your text here',
    hashtags: 'Your tags here'
  });
});

app.post('/users', (req, res) => {
  //to create a new gallery photo
  User.create({ username: req.body.username, password: req.body.password, emailaddress: req.body.emailaddress})
  .then((user) => {
    res.status(200)
    .json({
      success: true
    });
  });
});

app.post('/gallery', validate,(req, res) => {
  //to create a new gallery photo
  Photo.create({ title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    link: req.body.link,
    hashtags: req.body.hashtags,
    UserId: 2 })
  .then((photos) => {
    res.status(200)
    .json({
      success: true
    });
  });
});

app.get('/gallery/:id/edit', function(req, res) {
  //to edit selected photo in gallery
  let id = parseInt(req.params.id);
  Photo.findById(id)
  .then((photo) => {
    res.render('edit', {
      id: id,
      title: photo.title,
      link: photo.link,
      description: photo.description,
      author: photo.author,
      hashtags: photo.hashtags
    });
  });
});

app.get('/gallery/:id', function(req, res) {
  //to view single of gallery photo
  let id = req.params.id;
  renderById(res, id);
});

app.post('/gallery/:id', validate, function(req, res) {
  //to update selected photo in gallery
  if(req.body._method === 'PUT'){
    let id = parseInt(req.params.id);
    Photo.findById(id)
    .then((photo) => {
      photo.update({
        id: id,
        title: req.body.title || photo.title,
        description: req.body.description || photo.description,
        author: req.body.author || photo.author,
        link: req.body.link || photo.link,
        hashtags: req.body.hashtags || photo.hashtags
      })
      .then((photo) => {
      //add a WHERE clause here for hashtags
        renderById(res, id);
      });
    })
    .catch((error) => {
      res.status(404).render('404');
    });
  } else {
    res.sendStatus(405);
  }
});

app.put('/gallery/:id', validate, function(req, res) {
  //to update selected photo in gallery
  let id = req.params.id;
  Photo.findById(id)
  .then((photo) => {
    photo.update({
      title: req.body.title || photo.title,
      description: req.body.description || photo.description,
      author: req.body.author || photo.author,
      link: req.body.link || photo.link,
      hashtags: req.body.hashtags || photo.hashtags
    })
    .then((photo) => {
      res.status(200)
      .json({
        success: true
      });
    });
  });
});

app.delete('/gallery/:id', function(req, res) {
  //to delete selected photo in gallery
  let id = req.params.id;
  Photo.findById(id)
  .then((photo) => {
    photo.destroy();
    res.status(200)
    .json({
      success: true
    });
  })
  .catch((error) => {
    res.status(404).render('404');
  });
});

module.exports = app;