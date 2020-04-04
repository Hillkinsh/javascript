Function.prototype.mybind = function (ctx, ...args) {
  var _this = this
  function F() {
    args = args ? [...args, ...arguments] : [...arguments]
    F.prototype.__proto__ = new _this(...args) // 给继承用的
    return _this.apply(context, args)
  }
  return F
}

function Animal (name, color) {
  this.name = name || this.name
  this.color = color || this.color
  console.log(this.name + ' ... ' + this.color)
}
Animal.prototype.say = function () {
  return `I am a ${this.color}!!! ${this.name}`
}
let Cat = Animal.bind({name: 'name', color: 'color'})
// const cat = new Cat()
console.log(Cat.say())
// console.log(cat instanceof Cat)
// console.log(cat instanceof Animal)