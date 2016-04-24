
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('tickets', function(table) {
      table.increments().primary();
      table.integer('prizeId').notNullable().references('id').inTable('prizes');
      table.integer('userId').notNullable().references('id').inTable('users');
      table.string('number').notNullable().unique();
    }),

    knex.schema.createTableIfNotExists('prizes', function(table) {
      table.increments().primary();
      table.string('name').notNullable();
      table.string('imageUrl');
      table.string('infoUrl');
      table.integer('raffleId').notNullable().references('id').inTable('raffles');
      table.integer('winningTicketId').references('id').inTable('tickets');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('tickets'),
    knex.schema.dropTableIfExists('prizes')
  ]);
};
