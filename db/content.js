const knex = require('../knex/knex');

function listContents(url) {
    return knex.select().from('content_table').where('urlTitle', url)
  };
  
  module.exports = {
    listContents
  };