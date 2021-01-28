const db = require('../db')
const schemas = require('../schemas/product')

async function getProducts() {
  return await db.Product
    .query()
    .select('*')
}

async function createProduct(product) {
  const newProduct = await schemas.schema.validateAsync(product)
  return await db.Product
    .query()
    .insert(newProduct)
    .returning('*')
}

async function updateProduct(productId, product) {
  const id = await schemas.id.validateAsync(productId)
  const newProduct = await schemas.schema.validateAsync(product)
  return await db.Product
    .query()
    .update(newProduct)
    .where('id' === id)
}

async function deleteProduct(productId) {
  const id = await schemas.id.validateAsync(productId)
  return await db.Product
    .query()
    .del()
    .where('id' === id)
}

module.exports = {
  getProducts, 
  createProduct, 
  updateProduct,
  deleteProduct
}