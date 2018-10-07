
exports.up = function(knex, Promise) {

    return knex.schema.createTable('user', function(table) {
        table.increments('user_id');
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

    })

  
};

exports.down = function(knex, Promise) {
  return knex.schedma.dropTable('user');
};
