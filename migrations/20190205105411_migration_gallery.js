
exports.up = function (knex, Promise) {
  return knex.schema.createTable('gallery', function (table) {
    table.increments().primary();
    table.string('author').notNullable();
    table.string('link').notNullable();
    table.text('description').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('gallery');
};
