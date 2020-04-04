Function.prototype.mybind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('TypeError: Bind must be called on a function')
  }
  var _this = this
  function F() {
    args = args.concat(...arguments)
    if (args.length === _this.length) {
      F.prototype.__proto__ = new _this(...args.concat(...arguments))
    }
    if (this instanceof F) {
      return F.apply(context, args)
    }
  }
  return F
}
function Animal (name, color) {
  this.name = name
  this.color = color
}
Animal.prototype.say = function () {
  return `I am a ${this.color}!!! ${this.name}`
}

const Cat = Animal.mybind(null)
console.log(Cat)

const cat = new Cat('cat', 'white')
console.log(cat.say())
console.log(cat instanceof Cat)
console.log(cat instanceof Animal)