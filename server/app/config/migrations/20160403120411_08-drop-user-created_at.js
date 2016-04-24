
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('created_at');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable();
    })
  ]);
};
