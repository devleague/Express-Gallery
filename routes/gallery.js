const express = require('express');
const router = express.Router();
const Gallery = require('../db/models/Gallery');

/************************
 *  AUTH
************************/

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { next(); }
  else {
    req.flash('error', 'You must be logged in to do that')
    res.redirect('/login');
  }
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

  Gallery.where({ id: id }).fetch()
    .then((photo) => {
      const primaryPhoto = photo.attributes;
      const secondaryPhotos = [];

      Gallery.fetchAll()
        .then((photos) => {
          while (secondaryPhotos.length < 3) {
            let index = Math.floor(Math.random() * photos.length) + 1;
            let random = photos.models.slice(index, index + 1);

            if (random.length > 0 && random[0].attributes.id !== id) {
              secondaryPhotos.push(random[0].attributes);
            }
          }

          const data = {
            id: primaryPhoto.id,
            title: primaryPhoto.title,
            author: primaryPhoto.author,
            link: primaryPhoto.link,
            description: primaryPhoto.description,
            secondaryPhotos: secondaryPhotos,
            message: req.flash('error')
          };

          res.status(200);
          return res.render('./detail', data);
        });
    });
});

router.get('/:id/edit', isAuthenticated, (req, res) => {
  let id = req.params.id;

  Gallery.where({ id: id }).fetch()
    .then((photo) => {
      if (photo.attributes.user_id !== req.user.id && req.user.role_id !== 1) {
        req.flash('error', 'You cannot edit photos that aren\'t yours');
        return res.redirect(`/gallery/${id}`);
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
      if (photo.attributes.user_id !== req.user.id && req.user.role_id !== 1) {
        req.flash('error', 'You cannot edit photos that aren\'t yours');
        return res.redirect(`/gallery/${id}`);
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
      if (photo.attributes.user_id !== req.session.passport.user.id && req.user.role_id !== 1) {
        req.flash('error', 'You cannot delete photos that aren\'t yours');
        return res.redirect(`/gallery/${id}`);
      }

      new Gallery({ id: id })
        .destroy()
        .then(() => {
          return res.redirect(`/gallery`);
        });
    });
});

module.exports = router;