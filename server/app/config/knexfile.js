module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'velociraffle',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  // TODO: add production db
  // production: {
  //   client: 'pg',
  //   connection: ''
  // }

};
