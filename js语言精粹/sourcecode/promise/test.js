const Pro = require('./promise.code');

let a = new Pro(function(resolve, reject) {
  // console.log('1');
  reject(2);
  // console.log(3)
});

a.catch(err => console.log('e:::',err))

// let b = new Promise(function(resolve, reject) {
//   console.log('1');
//   reject(2);
//   console.log(3)
// });

// b.then(res => {
//   console.log(res)
// })


/**
 * new Promise((resolve, reject) => {})
 * 发生了什么
 * 
 * resolve: 2
 *   _state:1,
 *   _value:2,
 *  _deferreds: null,
 *  _handled: false，
 * 
 * reject: 2
 *  _state:2,
 *  _value:value,
 *  finale:
 *    _immediateFn:
 *       Promise._unhandledRejectionFn(self._value)
 *       抛出错误
 */

// then
/**
 * then方法:
 *   空函数创建新的promise
 *   新promise实例化一个deferred对象
 *   Handler {
      onFulfilled: [Function (anonymous)], // onFulfilled处理程序，没有则为null
      onRejected: [Function (anonymous)], // onRejected处理程序，没有则为null
      promise: Promise { // promise属性指向一个新的Promise实例
        _state: 0,
        _handled: false,
        _value: undefined,
        _deferreds: []
      }
    }
 *   执行handle(this, deferred)，后返回promise:
       Promise._immediateFn(() => {
         cb(self._value)
       })
 *     
 *   
 *   
 */


// catch
/**
 * this.then(null, onRejected)
 */

// 结论：
// 1. 微任务是在then时创建，resolve()时，只是修改了_value和_state
// 2. 微任务的执行：then方法时，返回一个新的promise，创建微任务，微任务的回调是
// Promise._immediateFn(() => {
//   cb(self._value)
// })