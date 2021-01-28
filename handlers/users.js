const db = require('../db')
const schemas = require('../schemas/user')


async function getUsers() {
	return await db.User
		.query()
		.select('*')
}
  
async function createUser(user) {
	const newUser = await schemas.schema.validateAsync(user)
	return await db.User
		.query()
		.insert(newUser)
		.returning('*')
}

module.exports = {
	getUsers,
	createUser
}