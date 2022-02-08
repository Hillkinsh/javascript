var Koa = require('koa');
var app = new Koa();

app.use(async function responseTime(ctx, next) {
  var start = new Date();
  await next();
  var ms = new Date() - start;
  ctx.set("X-Response-Time", ms + '-ms');
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(ctx => {
  ctx.body = 'Hello Koa';
});


app.listen(3000);

/**
 * 执行过程：（也就是一个洋葱模型的过程。）
 * 
 * 1. Create a date to track response time （line 5）
 * 
2. Await control to the next middleware （line 6）

3. Create another date to track duration （line 13）

4. Await control to the next middleware （line 14）

5. Set the response body to "Hello World"（line 20）

6. Calculate duration time （line 15）

7. Output log line （line 16）

8. Calculate response time （line 7）

9. Set X-Response-Time header field（line 8）

Hand off to Koa to handle the response
 */
