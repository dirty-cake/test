const Router = require('koa-router')
const { getLists, createList, updateList, deleteList } = require('../handlers/lists')

const router = new Router({prefix: '/lists'})

router.get('/', async ctx => {
  ctx.response.body = await getLists()
})

router.post('/', async ctx => {
  ctx.response.body = await createList(ctx.request.body.list)
})

router.patch('/:listId', async ctx => {
  ctx.response.body = await updateList(ctx.request.params.listId, ctx.request.body.list)
})

router.delete('/:listId', async ctx => {
  ctx.response.body = await deleteList(ctx.request.params.listId)
})

module.exports = router