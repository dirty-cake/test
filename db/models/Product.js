const { Model } = require('objection')

class Product extends Model {
  static get tableName() {
    return 'products'
  }

  static get relationMappings() {
    const List = require('./List')
    const User = require('./User')

    return {
      lists: {
        relation: Model.HasManyRelation,
        modelClass: List,
        join: {
          from: 'products.id',
          through: {
            from: 'lists_to_products.product_id',
            to: 'lists_to_products.list_id'
          },
          to: 'lists.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'products.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Product