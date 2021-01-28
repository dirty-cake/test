const Koa = require('koa')
const body = require('koa-body')
const lists = require('./routes/lists')
const products = require('./routes/products')
const users = require('./routes/users')

const app = new Koa()

app.use(body())

app.use(lists.routes())
app.use(products.routes())
app.use(users.routes())

app.listen(3000)