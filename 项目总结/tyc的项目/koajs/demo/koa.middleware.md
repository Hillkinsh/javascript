# 中间件

## 1.基本形式
中间件是一个简单函数。函数的形式是：
```js
async function responseTime(ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}

```
如上面的例子，如果想追踪一个请求通过koa需要多长时间，可以通过koa在响应头添加“X-Response-Time”

对于一个前端开发者来说，可以认为在next()之前的代码处于“捕获”阶段，而之后的则处于“冒泡”阶段，

完整的例子，参考**mid.js**

## 2.最佳实践

### 2.1 Middleware options

在创建公共中间件时，将中间件包装到接受选项的函数中的约定做法非常有用，这样用户就可以扩展功能。即使您的中间件不接受任何选项，这仍然是一个保持统一的好主意。

比如：这里，我们的logger中间件接受一个format字符串，并返回中间件本身：

### 2.2 命名中间件

给中间件命名是一个可选的操作，为调试目的指定一个名称很有用。

```js
function logger(format) {
  return async function logger(ctx, next) {

  };
}
```

### 2.3 用koa-compose组合中间件

```js
const compose = require('koa-compose');

async function random(ctx, next) {
  if ('/random' == ctx.path) {
    ctx.body = Math.floor(Math.random() * 10);
  } else {
    await next();
  }
};

async function backwards(ctx, next) {
  if ('/backwards' == ctx.path) {
    ctx.body = 'sdrawkcab';
  } else {
    await next();
  }
}

async function pi(ctx, next) {
  if ('/pi' == ctx.path) {
    ctx.body = String(Math.PI);
  } else {
    await next();
  }
}

const all = compose([random, backwards, pi]);

app.use(all);
```