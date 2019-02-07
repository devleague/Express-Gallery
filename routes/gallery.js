const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/************************
 *  AUTH
************************/

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else { res.redirect('/login'); }
}

/************************
 *  GET
************************/

router.get('/', (req, res) => {
  knex('gallery')
    .then((gallery) => {
      const primaryPhoto = gallery[0];
      const secondaryPhotos = gallery;
      secondaryPhotos.slice(0, 1);

      const data = {
        link: primaryPhoto.link,
        secondaryPhotos: secondaryPhotos
      }

      res.status(200);
      return res.render('./listing', data);
    });
});

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./new');
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  const promise1 = knex('gallery').where({ id: id });
  const promise2 = knex('gallery').whereNot({ id: id });

  Promise.all([promise1, promise2]).then((values) => {
    let primaryPhoto = values[0][0];
    let secondaryPhotos = [];

    for (let i = 0; i < 3; i++) {
      secondaryPhotos.push(values[1].pop());
    }

    const data = {
      title: primaryPhoto.title,
      author: primaryPhoto.author,
      link: primaryPhoto.link,
      description: primaryPhoto.description,
      secondaryPhotos: secondaryPhotos
    };

    res.status(200);
    return res.render('./detail', data);
  });

});

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;

  const photo = knex('gallery').where({ id: `${id}` });
  photo.then((found) => {
    res.status(200);
    return res.render('./edit', {
      id: found[0].id,
      title: found[0].title,
      author: found[0].author,
      link: found[0].link,
      description: found[0].description,
    });
  });
});


/************************
 * POST
************************/

router.post('/', (req, res) => {
  const body = req.body;

  knex('gallery').insert({ title: body.title, link: body.link, author: body.author, description: body.description })
    .then(() => {
      const newPhoto = knex('gallery').where({ title: body.title })

      newPhoto.then((photo) => {
        return res.redirect(`/gallery/${photo[0].id}`);
      });
    });
});

/************************
 *  PUT
************************/

router.put('/:id', (req, res) => {
  const body = req.body;
  const id = req.params.id;

  knex('gallery')
    .where({ id: id })
    .update({
      title: body.title,
      author: body.author,
      link: body.link,
      description: body.description
    })
    .then(() => {
      return res.redirect(`./${id}`);
    });
});

/************************
 *  DELETE
************************/

router.delete('/:id', (req, res) => {
  const id = req.params.id

  knex('gallery')
    .where({ id: id })
    .del()
    .then(() => {
      return res.redirect('/gallery');
    });
});

module.exports = router;