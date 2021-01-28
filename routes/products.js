const Router = require('koa-router')
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../handlers/products')

const router = new Router({prefix: '/products'})

router.get('/', async ctx => {
    ctx.response.body = await getProducts()
})

router.post('/', async ctx => {
    ctx.response.body = await createProduct(ctx.request.body.product)
})

router.patch('/:productId', async ctx => {
    ctx.response.body = await updateProduct(ctx.request.params.productId, ctx.request.body.product)
})

router.delete('/:productId', async ctx => {
    ctx.response.body = await deleteProduct(ctx.request.params.productId)
})

module.exports = router