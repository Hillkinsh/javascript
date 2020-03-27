/**
 * 
 * @param {*} fn 
 * @param {*} ctx 
 * @description
 * bind 基本用法
 * bind(ctx, ...args)
 * ctx是绑定的环境，args是后续等待使用的参数。situation 1， situation 2.
 * 
 * bind和原型缠搅在一起 situation 3，正常调用走bind，new操作，还走new
 * 
 */
function _bind (fn, ctx) {
  return (...args) => fn.apply(ctx, args)
}
// bind使用

function cat (name, age) {
  this.name = name || this.name
  this.age = age || this.age
    console.log(this.name)
    console.log(this.age)
}
cat.prototype.setName = function (name) {
  this.name = name
}

let tar = {
  name: 'tar',
  age: '-1'
}

// situation 1
// let a = cat.bind(tar, 'mimi')
// console.log(a(25)) // mimi 25

// situation 2
// let a = cat.bind(tar)
// console.log(a('a',25)) // a 25

// 3.原型

var to = {
  name:"to",
  color:"red"
}
function Animal () {
 console.log(`name:${this.name}...color:${this.color}`);
}
Animal.prototype.say = function () {
 console.log(`say..name:${this.name}...color:${this.color}`);
}
// var Cat = Animal.bind(to)
// Cat() // name:to...color:red
// var cat = new Cat() // name:undefined...color:undefined
// cat.say() // say..name:undefined...color:undefined

function _bind (fn, ctx, ...args) {
  function result (args2) {
    fn.apply(ctx, args.concat(args2))
  }
  result.prototype = fn.prototype
  return result
}

var Cat = _bind(Animal, to)
Cat() // name:to...color:red

var cat = new Cat() // name:undefined...color:undefined

cat.say();//say..name:undefined...color:undefined

// 大神实现版
Function.prototype.mybind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
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

// 基本功能对比：
function foo () {console.log(this)}
let a = foo.bind({})
a()