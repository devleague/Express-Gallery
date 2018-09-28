exports.up = function(knex, Promise) {
    return knex.schema.createTable('content_table', function(table) {
      table.increments();
      table.string('title', 200).notNullable();
      table.string('link', 200).notNullable();
      table.string('description', 1000).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('content_table');
  }