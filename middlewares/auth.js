const jwt = require('jsonwebtoken')

async function auth(ctx, next) {
  const token = ctx.headers.authorization
  if (token) ctx.state.auth = jwt.verify(token, process.env.JWT_CONFIG)
  await next()
}

module.exports = auth