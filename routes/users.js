const Router = require('koa-router')
const db = require('../db')

const router = new Router({prefix: '/users'})

router.get('/', async ctx => {
  await db.User.query().insert({
    username: 'Sam',
    password: '123123'
  });
})

module.exports = router