const express = require('express');
const Router = express.Router();
const Gallery = require('../db/models/gallery.js');

Router.get('/', (req, res) => {
    console.log('req.session', req.session);
    if (!req.session.viewCount) {
        req.session.viewCount = 1
    } else {
        req.session.viewCount++;
    }
    Gallery
    .fetchAll()
    .then( gallery => {
        let galleryThing = gallery.serialize()
        console.log('pls', galleryThing);
        res.render('home', {galleryThing});
    })
    .catch( err => {
        console.log('gallery err', err);
        res.json(err);
    })
})

Router.get('/gallery/new', (req, res) => {
    res.render('form');
})

Router.get('/gallery/:gallery_id', (req, res) => {
    const { gallery_id } = req.params;
    Gallery
    .where({ gallery_id })
    .fetchAll()
    .then( gallery => {
        let galleryDetail = gallery.toJSON()
        res.render('detail', {galleryDetail});
    })
    .catch( err => {
        console.log('detail err', err);
        res.json(err);
    })
})

Router.post('/gallery/new', (req, res) => {
    const { gallery_id } = req.params;
    const payload = {
        author: req.body.author,
        link: req.body.link,
        description: req.body.description
    }
    Gallery
    .forge(payload)
    .save()
    .then( result => {
        res.redirect('/');
    })
    .catch( err => {
        console.log('err', err)
        res.json(err);
    })
})

Router.put('/gallery/:gallery_id', (req, res) => {
    const { gallery_id } = req.params;
    const payload = {
        author: req.body.author.trim(),
        link: req.body.link.trim(),
        description: req.body.description.trim()
    }

    Gallery
    .where({gallery_id})
    .fetch()
    .then( gallery => {
        return gallery.save(payload)
    })
    .then( result => {
        res.redirect(`/gallery/${gallery_id}`)
    })
    .catch( err => {
        res.json(err);
    })
})

Router.delete('/gallery/:gallery_id', (req, res) => {
    const {gallery_id} = req.params;
    // console.log('gal', gallery_id);
    Gallery
    .where({gallery_id})
    .destroy()
    .then( result => {
        res.redirect('/');
    })
    .catch( err => {
        // console.log('wy doe', err);
        res.json(err);
    })
})

Router.get('/gallery/:gallery_id/edit', (req, res) => {
    const { gallery_id } = req.params;
    Gallery
    .where({ gallery_id })
    .fetchAll()
    .then( gallery => {
        let galleryUpdate = gallery.toJSON()
        res.render('update', {galleryUpdate});
    })
    .catch( err => {
        console.log('update err', err);
        res.json(err);
    })
})

module.exports = Router
  
//   // delete task by task id
//   Router.delete('/tasks/:task_id/delete', (req, res) => {
//     const { task_id } = req.params;
    
//     Tasks
//       .where({ task_id })
//       .destroy()
//       .then( result => {
//         res.json(result);
//       })
//       .catch(err => {
//         res.json(err);
//       })
//   })



// module.exports = Router;