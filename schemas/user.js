const Joi = require('joi')

exports.id = Joi.number().integer()

exports.schema = Joi.object({ 
  username: Joi.string().pattern(/^[a-z0-9_\-.]+$/),
  password: Joi.string().min(8).max(16)
})