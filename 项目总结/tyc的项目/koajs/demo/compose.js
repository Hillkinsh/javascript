var Koa = require('koa');
var app = new Koa();

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      // i == 0
      if (i === middleware.length) fn = next
      console.log(i, fn)
      if (!fn) return Promise.resolve()
      
      try {

        // 这么写只是为了让下一个中间件得到机会执行。因为
        // dispatch.bind(null, i + 1) 此时相当于next
        // 当最后一个mid执行完后，执行next。
        return Promise.resolve(
          fn(context, () => dispatch(i + 1))
        )
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


async function random(ctx, next) {
  if ('/random' == ctx.path) {
    ctx.body = Math.floor(Math.random() * 10);
  } else {
    console.log('random 1')
    await next();
    console.log('random 2')
  }
};

async function backwards(ctx, next) {
  if ('/backwards' == ctx.path) {
    ctx.body = 'sdrawkcab';
  } else {
    console.log('backwards 1')
    await next();
    console.log('backwards 2')
  }
}

async function pi(ctx, next) {
  console.log('pi 1')
  if ('/pi' == ctx.path) {
    ctx.body = String(Math.PI);
  } else {
    await next();
  }
}

const all = compose([random, backwards, pi]);
function nex () {
  console.log('nex')
}
const ctx = {
  path: "/pi"
}
// console.log('out', all(ctx, nex))


/**
 * 这里比较难理解的地方是为什么一个
 * return Promise.resolve(
          fn(context, () => dispatch(i + 1))
        )
   之后，就全部完成了。这里需要promise的一个知识。
 */

   /**
    * Promise.resolve
    * 
    * 1. Promise.resolve(1) 返回一个promise
    * 
    * 2. thenable
    */

    var thenObj = {
      then(resolve){
        console.log('then')
        resolve(2)
      }
    }
    Promise.resolve(thenObj).then(res => console.log(res))
    // then
    // 2

    /**
     * 3.promise
     */

let pms = new Promise((resolve, reject) => {
  resolve('pms')
})
console.log(pms, Promise.resolve(pms), pms === Promise.resolve(pms))
// Promise { 'pms' } Promise { 'pms' } true
Promise.resolve(pms)

/**
 * 
 *  参数
    value
    将被Promise对象解析的参数，也可以是一个Promise对象，或者是一个thenable。

    返回值
    返回一个带着给定值解析过的Promise对象，如果参数本身就是一个Promise对象，则直接返回这个Promise对象。
 */
function c() {
  console.log('c 1');
  return Promise.resolve('c')
}
function b() {
  console.log('b 1');
  return Promise.resolve(c())
}
function a () {
  console.log('a 1');
  return Promise.resolve(b())
}
console.log(Promise.resolve(a())) // Promise { 'c' }

// 上面的例子就是compose的原理
