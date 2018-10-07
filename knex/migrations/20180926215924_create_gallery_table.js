
exports.up = function(knex, Promise) {
    return knex.schema.createTable('gallery', function(table) {
        table.increments('gallery_id');
        table.text('author').notNullable();
        table.text('link').notNullable();
        table.text('description', ['longtext']).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gallery');
};
