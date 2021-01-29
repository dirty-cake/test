const Knex = require('knex')
const configs = require('../../knexfile')

async function create() {
  const config = configs[process.env.NODE_ENV || 'test']

  const database = config.connection.database
  config.connection.database = null


  let knex = Knex(config)
  await knex.raw(`DROP DATABASE IF EXISTS ${database}`)
  await knex.raw(`CREATE DATABASE ${database}`)
  await knex.destroy()

  knex = Knex({...config, connection: {...config.connection, database}})
  await knex.migrate.latest()

  return {
    async drop() {
      await knex.destroy()
      knex = Knex(config)
      await knex.raw(`DROP DATABASE IF EXISTS ${database} WITH (FORCE)`)
      await knex.destroy()
    },
    async clear() {
      await knex.migrate.rollback()
      await knex.migrate.latest()
    }
  }
}

module.exports = {create}