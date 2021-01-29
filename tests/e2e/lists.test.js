const assert = require('assert')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const db = require('../../db')
const app = require('../../index')

const ACCESS_TOKEN = jwt.sign({ userId: 1 }, 'secret')

describe('lists', () => {
  before(async () => {
    await db.User.query().insertGraph({
      username: 'user',
      password: '123',
      lists: [{
        name: 'shopping', products: [{name: 'car'}, {name: 'toy'}]
      }]
    })
  })
  
  after(async () => {
    await db.knex.destroy()
  })

  it.only('should return lists', async () => {
    await supertest(app.callback())
      .get('/lists')
      .expect(200, [
        { id: 1, name: 'shopping', userId: 1 },
        { id: 2, name: 'purchasing', userId: 1 },
      ])
  })

  it('should save new list', async () => {
    const expected = { id: 3, name: 'cars', userId: 1 }

    await supertest(app.callback())
      .post('/lists')
      .send({ name: expected.name })
      .set('Authorization', ACCESS_TOKEN)
      .expect(200, expected)

    const addedProduct = await db.Product.query().findById(expected.id).withGraphJoined('products')
    assert.deepStrictEqual(addedProduct.toJSON(), expected)
  })

  it('should not save new list for nonauthorized user', async () => {

    await supertest(app.callback())
      .post('/lists')
      .send({ name: 'cars' })
      .expect(401)
  })

  it('should update existed list', async () => {
    const expected = { id: 2, name: 'cars', userId: 1 }

    await supertest(app.callback())
      .patch(`/lists/${expected.id}`)
      .send({ name: expected.name })
      .set('Authorization', ACCESS_TOKEN)
      .expect(200, expected)

    const updatedProduct = await db.Product.query().findById(expected.id).withGraphJoined('products')
    assert.deepStrictEqual(updatedProduct.toJSON(), expected)
  })

  it('should not update existed list for nonauthorized user', async () => {

    await supertest(app.callback())
      .patch('/lists/ 1')
      .send({ name: 'cars' })
      .expect(401)
  })

  it('should delete existed list', async () => {
    const expected = {id: 1}
    await supertest(app.callback())
      .delete(`/lists/${expected.id}`)
      .set('Authorization', ACCESS_TOKEN)
      .expect(204)

    const deletedProduct = await db.Product.query().findById(expected.id).withGraphJoined('products')
    assert.strictEqual(deletedProduct, undefined)
  })

  it('should not delete existed list for nonauthorized user', async () => {

    await supertest(app.callback())
      .delete('/list/1')
      .expect(401)

  })
})

