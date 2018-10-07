const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const authRoutes = require('./routes/authRoutes.js');

const PORT = process.env.EXPRESS_CONTAINER_PORT;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true }));
app.set('view engine', '.hbs')
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))

const userRoutes = require('./routes/userRoutes.js');
const galleryRoutes = require('./routes/galleryRoutes.js');

app.use(session({
  store: new RedisStore({url: 'redis://redis:6379', logErrors: true}),
  secret: 'xpgal',
  resave: false,
  saveUninitialized: true
}))

app.use('/', userRoutes);
app.use('/', galleryRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})