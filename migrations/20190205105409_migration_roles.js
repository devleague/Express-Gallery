
exports.up = function (knex, Promise) {
  return knex.schema.createTable('roles', function (table) {
    table.increments();
    table.string('role').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('roles');
};
