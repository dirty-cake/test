const Joi = require('joi')
const user = require('./user')

exports.id = Joi.number().integer()

exports.schema = Joi.object({ 
  name: Joi.string().pattern(/^[a-zA-Z]+$/),
  userId: user.id.forbidden()
})