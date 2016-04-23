
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raffles', function(table) {
      table.dropColumn('imageUrl');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('raffles', function(table) {
      table.string('imageUrl');
    })
  ]);
};
