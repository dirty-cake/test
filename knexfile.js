module.exports = {
  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    database: 'test'
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
};
