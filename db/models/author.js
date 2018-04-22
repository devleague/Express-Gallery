const bookshelf = require('./bookshelf');
const Author = bookshelf.Model.extend({
  tableName: 'author',
  idAttribute: 'author_id',
  hasTimestamps: true
});
module.exports = Author;
