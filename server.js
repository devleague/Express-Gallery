const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const galleryRouter = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('views', __dirname + '/views/templates');
app.set('view engine', '.hbs');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/gallery', galleryRouter);


const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});