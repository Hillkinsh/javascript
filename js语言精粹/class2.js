/**
 * 1. 继承机制：
 * 先将父类的实例对象的属性和方法加到this上，（所以必须调用super）
 * 然后再用子类的构造函数修改this
 */
class Parent {
  _name
  _age
  constructor() {
    this._name = 'name'
    this._age = 'age'
  }
  sayHi() {
    console.log('Hi, Mr. ' + this._name)
  }
  static getTime() {
    return new Date()
  }
}

class Child extends Parent {
  _name
  _age
  constructor(name, age) {
    super()
    this._name = name
    this._age = age
  }
}
// 构造器：子类如果没有定义constructor，则默认添加
class Child2 extends Parent {}
// 等价于
class Child3 extends Parent {
  constructor(...args) {
    super(...args)
  }
}

// super 关键字，super关键字既可以当函数使用，也可以当对象使用
// super做函数使用时，表示父类构造函数，
// 在普通方法中，指向父类的原型对象
// 在静态方法中，指向父类

class SuperFn extends Parent {
  constructor(...args) {
    super(...args)
  }
}
class CommonMethod extends Parent {
  constructor(...args) {
    super(...args)
  }
  myHi() {
    console.log('hahaha', super.sayHi())
  }
}
class StaticMethod extends Parent {
  constructor(...args) {
    super(...args)
  }
  static info() {
    console.log('hahaha 这里是汇通。' + super.getTime())
  }
}
console.log(new SuperFn('name', 'age'))
let cm = new CommonMethod('name', 'age')
console.log(cm.sayHi())
console.log(cm.myHi())
StaticMethod.info()
