Function.prototype.mybind = function (ctx, ...args) {
  var _this = this
  function F() {
    args = args ? [...args, ...arguments] : [...arguments]
    F.prototype.__proto__ = new _this(...args) // 给继承用的
    _this.apply(context, args)
  }
  return F
}

/**
 * 是根据一道面试题目写出来的。比大神版本的效果好一些
 */

function Animal (name, color) {
  this.name = name || this.name
  this.color = color || this.color
  console.log(this.name + ' ... ' + this.color)
}
Animal.prototype.say = function () {
  return `I am a ${this.color}!!! ${this.name}`
}
let Cat = Animal.bind({name: 'name', color: 'color'}, 'white')

Cat() // 基本使用

const cat = new Cat('cat') // 原型链上的使用
console.log(cat.say())
console.log(cat instanceof Cat)
console.log(cat instanceof Animal)