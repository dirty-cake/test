const Router = require('koa-router')

const router = new Router({prefix: '/products'})

router.get('/', ctx => {})

router.post('/', ctx => {})

router.patch('/:productId', ctx => {})

router.delete('/:productId', ctx => {})

module.exports = router