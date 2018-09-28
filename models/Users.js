const bookshelf = require('./bookshelf');

const Users = bookshelf.Model.extend({
    tableName: 'users_table',
    idAttribute: 'users_id',
    hasTimestamps: true
});

module.exports = Users;