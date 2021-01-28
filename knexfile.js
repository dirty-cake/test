module.exports = {
  client: 'postgresql',
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
};
