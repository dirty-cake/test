
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').unsigned().primary()
    table.string('username').unique()
    table.string('password')
  })

  await knex.schema.createTable('products', table => {
    table.increments('id').unsigned().primary()
    table.string('name')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
  })

  await knex.schema.createTable('lists', table => {
    table.increments('id').unsigned().primary()
    table.string('name')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
  })

  await knex.schema.createTable('lists_to_products', table => {
    table.integer('list_id').unsigned()
    table.foreign('list_id').references('lists.id')
    table.integer('product_id').unsigned()
    table.foreign('product_id').references('products.id')
    table.primary(['list_id', 'product_id'])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('lists_to_products')
  await knex.schema.dropTable('lists')
  await knex.schema.dropTable('products')
  await knex.schema.dropTable('users')
};
