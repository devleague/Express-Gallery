
exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.integer('role_id').references('id').inTable('roles');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
