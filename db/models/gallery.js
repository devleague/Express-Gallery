const bookshelf = require('./bookshelf');

const Users = bookshelf.Model.extend({
  tableName: 'classes',
  idAttribute: 'photo_id',
  hasTimestamps: true
});

module.exports = Gallery;
