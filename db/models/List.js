const { Model } = require('objection')

class List extends Model {
  static get tableName() {
    return 'lists'
  }

  static get relationMappings() {
    const User = require('./User')
    const Product = require('./Product')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'lists.user_id',
          to: 'users.id'
        }
      },
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'lists.id',
          through: {
            from: 'lists_to_products.list_id',
            to: 'lists_to_products.product_id'
          },
          to: 'products.id'
        }
      }
    }
  }
}

module.exports = List