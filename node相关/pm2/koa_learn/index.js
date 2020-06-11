const Koa = require('koa');
const app = new Koa();
const cvt = require('koa-convert');
const log = require('./middleware/logger-generator-async');

app.use(log())

app.use( async ctx => {
  let url = ctx.request.url
  ctx.body = 'hello koa.' + url;
})

app.listen(3000)
console.log('server starting...')