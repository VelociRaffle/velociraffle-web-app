import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from './knexfile';

const dbConfig = process.env.NODE_ENV === 'development'
  ? knexConfig.development
  : knexConfig.production;

const Bookshelf = bookshelf(
  knex(dbConfig)
);

Bookshelf.plugin('registry');

export default Bookshelf;
