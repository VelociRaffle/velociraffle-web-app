
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('charities', function(table) {
      table.increments().primary();
      table.string('name').notNullable().unique();
      table.string('description', 999);
      table.string('imageUrl');
      table.string('infoUrl');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('charities')
  ]);
};
