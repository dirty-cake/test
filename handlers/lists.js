const db = require('../db')
const schemas = require('../schemas/list')

async function getLists() {
  return await db.List
    .query()
    .select('*')
}

async function createList(list) {
  const newList = await schemas.schema.validateAsync(list)
  return await db.List
    .query()
    .insert(newList)
    .returning('*')
}

async function updateList(listId, list) {
  const id = await schemas.id.validateAsync(listId)
  const newList = await schemas.schema.validateAsync(list)
  return await db.List
    .query()
    .update(newList)
    .where('id' === id)
}

async function deleteList(listId) {
  const id = await schemas.id.validateAsync(listId)
  return await db.List
    .query()
    .del()
    .where('id' === id)
}

module.exports = {
  getLists, 
  createList, 
  updateList,
  deleteList
}