const { Model } = require('objection')
const Knex = require('knex')
const User = require('./models/User')
const List = require('./models/List')
const Product = require('./models/Product')

const knex = Knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '12345678',
    database: 'test'
  },
  debug: true
})

// knex.raw('SELECT 1').then(() => {
//   console.log('connected')
// }).catch(err => {
//   console.log(err)
// });

Model.knex(knex)

module.exports = {
  User,
  List,
  Product
}