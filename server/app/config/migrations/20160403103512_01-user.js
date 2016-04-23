
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments().primary();
      table.uuid('uuid');
      table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable();
      table.string('email').notNullable().unique();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
