
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('raffles', function(table) {
      table.increments().primary();
      table.integer('charityId').notNullable().references('id').inTable('charities');
      table.string('name').notNullable();
      table.date('expirationDate').notNullable();
      table.string('imageUrl');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('raffles')
  ]);
};
