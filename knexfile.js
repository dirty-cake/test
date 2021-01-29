module.exports = {
  dev: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '12345678',
      database: 'test'
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '12345678',
      database: 'test_db'
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations',
    },
    debug: false
  }
};
