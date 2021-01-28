const Router = require('koa-router')

const router = new Router({prefix: '/lists'})

router.get('/', ctx => {})

router.post('/', ctx => {})

router.patch('/:listId', ctx => {})

router.delete('/:listId', ctx => {})

module.exports = router