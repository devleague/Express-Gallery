exports.up = function(knex, Promise) {
    return knex.schema.table('users_table', function(table) {
      table.string('passwords', 100);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('users_table', function(table) {
      table.dropColumn('passwords');
    });
  };
  