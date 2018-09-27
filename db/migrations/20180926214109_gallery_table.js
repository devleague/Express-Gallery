exports.up = function(knex, Promise) {
    return knex.schema.createTable('gallery_table', function(table) {
      table.increments();
      table
        .integer('users_id')
        .references('id')
        .inTable('users_table');
      table
        .integer('content_id')
        .references('id')
        .inTable('content_table');
      table.integer('level');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('gallery_table');
  };
  