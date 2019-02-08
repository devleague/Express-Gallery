const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Gallery = require('../db/models/Gallery');

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

  Gallery.fetchAll()
    .then((photos) => {
      const primaryPhoto = photos.models[0].attributes;
      const secondaryPhotos = [];

      for (let i = 1; i < photos.models.length; i++) {
        secondaryPhotos.push(photos.models[i].attributes);
      }

      const data = {
        id: primaryPhoto.id,
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
      id: primaryPhoto.id,
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

router.get('/:id/edit', isAuthenticated, (req, res) => {
  let id = req.params.id;

  Gallery.where({ id: id }).fetch()
    .then((photo) => {
      if (photo.attributes.user_id !== req.user.id) {
        return res.redirect('/');
      }

      res.status(200);
      return res.render('./edit', {
        id: photo.attributes.id,
        title: photo.attributes.title,
        author: photo.attributes.author,
        link: photo.attributes.link,
        description: photo.attributes.description,
      });
    });
});


/************************
 * POST
************************/

router.post('/', isAuthenticated, (req, res) => {
  const body = req.body;

  Gallery.forge({
    user_id: req.user.id,
    title: body.title,
    link: body.link,
    author: body.author,
    description: body.description
  }).save(null, { method: 'insert' })
    .then(() => {
      new Gallery({ title: body.title }).fetch()
        .then((photo) => {
          return res.redirect(`/gallery/${photo.id}`);
        });
    });
});

/************************
 *  PUT
************************/

router.put('/:id', isAuthenticated, (req, res) => {
  const body = req.body;
  const id = req.params.id;

  Gallery.where({ id: id }).fetch()
    .then((photo) => {
      if (photo.attributes.user_id !== req.user.id) {
        return res.redirect('/');
      }

      new Gallery({ id: id })
        .save({
          user_id: req.user.id,
          title: body.title,
          link: body.link,
          author: body.author,
          description: body.description
        }, { patch: true })
        .then(() => {
          return res.redirect(`/gallery/${photo.id}`);
        });
    });
});

/************************
 *  DELETE
************************/

router.delete('/:id', isAuthenticated, (req, res) => {
  const id = req.params.id

  Gallery.where({ id: id }).fetch()
    .then((photo) => {
      if (photo.attributes.user_id !== req.session.passport.user.id) {
        return res.redirect('/');
      }

      new Gallery({ id: id })
        .destroy()
        .then(() => {
          return res.redirect(`/gallery`);
        });
    });
});

module.exports = router;