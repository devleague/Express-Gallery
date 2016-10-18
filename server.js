let express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
let app = express();
let db = require('./models');
let Photo = db.Photo;
let User = db.User;

app.use(express.static('./public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true}));

app.listen(3000, function() {
  db.sequelize.sync();
});

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

app.get('/gallery/:id', function(req, res) {
  //to view single of gallery photo
  let id = req.params.id;
  Photo.findById(id)
    .then((photo) => {
      res.render('photo', {
        title:photo.title,
        link: photo.link,
        description: photo.description,
        //needs to be edited
        relatedPhotos: [photo]
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
    description: 'Your text here'
  });
});

app.post('/users', (req, res) => {
  //to create a new gallery photo
  User.create({ username: req.body.username, password: req.body.password, emailaddress: req.body.emailaddress})
    .then((user) => {
      res.json(user);
    });
});


app.post('/gallery', (req, res) => {
  //to create a new gallery photo
  Photo.create({ description: req.body.description, author: req.body.author, link: req.body.link, UserId: 2 })
    .then((photos) => {
      res.json(photos);
    });
});


app.get('/gallery/:id/edit', function(req, res) {
  //to edit selected photo in gallery
  let id = req.params.id;
  Photo.findById(id)
    .then((photo) => {
      res.json(photo);
    });
});

app.put('/gallery/:id', function(req, res) {
  //to update selected photo in gallery
  let id = req.params.id;
  Photo.findById(id)
  .then((photo) => {
    photo.update({
      description: req.body.description || photo.description,
      author: req.body.author || photo.author,
      link: req.body.link || photo.link
    })
    .then((photo) => {
      res.json(photo);
    });
  });
});

app.delete('/gallery/:id', function(req, res) {
  //to delete selected photo in gallery
  let id = req.params.id;
  Photo.findById(id)
    .then((photo) => {
      photo.destroy();
      res.send('SUCCESS');
  });
});