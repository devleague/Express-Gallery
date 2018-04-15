exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes', table => {
    table.increments('photo_id').primary();
    table.string('class').notNullable();
    table.string('link').notNullable();
    table.string('author').notNullable();
    table.text('desc').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('classes');
};
