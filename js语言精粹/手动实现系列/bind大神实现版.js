// 大神实现版
Function.prototype.mybind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('TypeError: Bind must be called on a function')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

// 1.基本功能对比：
foo.bind()
function foo () {console.log('this:', this)}
let a = foo.mybind({})

// console.log(a())

// 2.其他情况，健壮性
// let bind = foo.mybind
// bind() // TypeError

// 3. new操作 绑定到foo上
let out = foo.mybind({a:1})
new out() // foo

// let bind = foo.mybind
// // bind()
// let out = foo.mybind({})
// new out()