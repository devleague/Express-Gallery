exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('classes', table => {
      table.increments('photo_id').primary();
      table
        .string('class')
        .notNullable()
        .defaultsTo('NPC');
      table
        .string('link')
        .notNullable()
        .defaultsTo('https://i.ytimg.com/vi/RqXkqOTU6Q4/hqdefault.jpg');
      table
        .string('author')
        .notNullable()
        .defaultsTo('Anon');
      table.text('desc').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('author', table => {
      table.increments('author_id').primary();
      table.string('name').notNullable();
      table
        .integer('photo_id')
        .references('photo_id')
        .inTable('classes')
        .onDelete('cascade');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('author').dropTable('classes');
};
