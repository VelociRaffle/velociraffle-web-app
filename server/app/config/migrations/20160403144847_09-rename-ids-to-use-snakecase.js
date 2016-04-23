
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('charities', function(table) {
      table.renameColumn('imageUrl', 'image_url');
      table.renameColumn('infoUrl', 'info_url');
    }),
    knex.schema.table('prizes', function(table) {
      table.renameColumn('imageUrl', 'image_url');
      table.renameColumn('infoUrl', 'info_url');
      table.renameColumn('raffleId', 'raffle_id');
      table.renameColumn('winningTicketId', 'winning_ticket_id');
    }),
    knex.schema.table('raffles', function(table) {
      table.renameColumn('charityId', 'charity_id');
      table.renameColumn('expirationDate', 'expiration_date');
    }),
    knex.schema.table('tickets', function(table) {
      table.renameColumn('prizeId', 'prize_id');
      table.renameColumn('userId', 'user_id');
    }),
    knex.schema.table('users', function(table) {
      table.renameColumn('firstName', 'first_name');
      table.renameColumn('lastName', 'last_name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('charities', function(table) {
      table.renameColumn('image_url', 'imageUrl');
      table.renameColumn('info_url', 'infoUrl');
    }),
    knex.schema.table('prizes', function(table) {
      table.renameColumn('image_url', 'imageUrl');
      table.renameColumn('info_url', 'infoUrl');
      table.renameColumn('raffle_id', 'raffleId');
      table.renameColumn('winning_ticket_id', 'winningTicketId');
    }),
    knex.schema.table('raffles', function(table) {
      table.renameColumn('charity_id', 'charityId');
      table.renameColumn('expiration_date', 'expirationDate');
    }),
    knex.schema.table('tickets', function(table) {
      table.renameColumn('prize_id', 'prizeId');
      table.renameColumn('user_id', 'userId');
    }),
    knex.schema.table('users', function(table) {
      table.renameColumn('first_name', 'firstName');
      table.renameColumn('last_name', 'lastName');
    })
  ]);
};
