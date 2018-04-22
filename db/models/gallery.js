const bookshelf = require('./bookshelf');

const Gallery = bookshelf.Model.extend({
  tableName: 'classes',
  idAttribute: 'photo_id',
  hasTimestamps: true
});

module.exports = Gallery;
