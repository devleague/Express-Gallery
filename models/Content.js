const bookshelf = require('./bookshelf');

const Content = bookshelf.Model.extend({
    tableName: 'content_table',
    idAttribute: 'content_id',
    hasTimestamps: true
});

module.exports = Content