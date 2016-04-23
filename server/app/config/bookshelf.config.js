import knex from 'knex';
import bookshelf from 'bookshelf';
import config from './knexfile';

const Bookshelf = bookshelf(
  knex(config.development)
);

Bookshelf.plugin('registry');

export default Bookshelf;