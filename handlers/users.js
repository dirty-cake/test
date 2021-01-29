const jwt = require('jsonwebtoken')
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

async function signIn(credentials) {
	credentials = await schemas.schema.validateAsync(credentials)
	const user = await db.User.query().where('username', credentials.username).first()
	if (!user) throw new Error('no such user')
	if (!user.verifyPassword(credentials.password)) throw new Error('Invalid password')
	const token = jwt.sign({userId: user.id}, 'secret')
	user.token = token
	return user
}

module.exports = {
	getUsers,
	createUser,
	signIn
}