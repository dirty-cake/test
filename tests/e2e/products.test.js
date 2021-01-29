const assert = require('assert')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const db = require('../../db')
const app = require('../../index')

const ACCESS_TOKEN = jwt.sign({ userId: 1 }, 'secret')

describe('products', () => {
  before(async () => {
    await db.User.query().insertGraph({
      username: 'user',
      password: '123',
      products: [{ name: 'cake' }, { name: 'coffee' }]
    })
  })

  after(async () => {
    await db.knex.destroy()
  })

  it('should return products', async () => {
    await supertest(app.callback())
      .get('/products')
      .expect(200, [
        { id: 1, name: 'cake', userId: 1 },
        { id: 2, name: 'coffee', userId: 1 },
      ])
  })

  it('should save new product', async () => {
    const expected = { id: 3, name: 'train', userId: 1 }

    await supertest(app.callback())
      .post('/products')
      .send({ name: expected.name })
      .set('Authorization', ACCESS_TOKEN)
      .expect(200, expected)

    const addedProduct = await db.Product.query().findById(expected.id)
    assert.deepStrictEqual(addedProduct.toJSON(), expected)
  })

  it('should update existed product', async () => {
    const expected = { id: 2, name: 'tea', userId: 1 }
    await supertest(app.callback())
      .patch(`/products/${expected.id}`)
      .send({ name: expected.name })
      .set('Authorization', ACCESS_TOKEN)
      .expect(200, expected)

    const updatedProduct = await db.Product.query().findById(expected.id)
    assert.deepStrictEqual(updatedProduct.toJSON(), expected)
  })

  it('should delete existed product', async () => {
    const expected = {id: 1}
    await supertest(app.callback())
      .delete(`/products/${expected.id}`)
      .set('Authorization', ACCESS_TOKEN)
      .expect(204)

    const deletedProduct = await db.Product.query().findById(expected.id)
    assert.strictEqual(deletedProduct, undefined)
  })
})
