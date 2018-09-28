const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars')
const knex = require('../db/knex');
// const Articles_DB = require('../db/articles');
const PORT = process.env.EXPRESS_CONTAINER_PORT || 8080;

const Users = require('./models/Users');
const Content = require('./models/Content');

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')


app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

/*---------Get Pages------------*/

// app.get('/', (req, res) => {
//     res.render('home');
// });

app.get('/', (req, res) => {
    knex.select().from('content_table')
      .then(result => {
        res.render('home');
      })
      .catch(err => console.log(err));
  });
  

app.get('/details', (req, res) => {
    res.render('detail');
});

app.get('/edit', (req, res) => {
    res.render('edit');
});

app.get('/edituser', (req, res) => {
    res.render('edituser');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/new', (req, res) => {
    res.render('new');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});


app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});

