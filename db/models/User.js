const { Model } = require('objection')
const bcrypt = require('bcrypt')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const List = require('./List')
    const Product = require('./Product')

    return {
      lists: {
        relation: Model.HasManyRelation,
        modelClass: List,
        join: {
          from: 'users.id',
          to: 'lists.user_id'
        }
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'users.id',
          to: 'products.user_id'
        }
      }
    }
  }
  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json)
    json.password = bcrypt.hashSync(json.password, 10)
    return json
  }
}

module.exports = User