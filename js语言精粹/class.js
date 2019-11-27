//对类的各种特性做一个系统研究

// 1. 构造器
// 1.1 必须有，如没有显示定义，则默认添加
class A {}
class B {
  constructor() {}
}
// 1.2 constructor 默认返回实例对象（this）完全可以指定返回另一个对象
// 当给类添加了方法，就没法玩了

let obj = {
  a: 1,
  b: 2,
  c: 3
}
class C {
  constructor() {
    return {
      ...obj
    }
  }
  sayHelo() {
    console.log('hello')
  }
}
let c = new C()
// console.log(new C()) // { a: 1, b: 2, c: 3 }
// c.sayHelo() // 报错了，所以还是别用这个骚操作

// 2. getter 和 setter
class GS {
  constructor(name) {
    this.namepro = name
  }
  get name() {
    return this.namepro
  }
  set name(val) {
    this.namepro = val
  }
}

let gs = new GS('xiaoming')
// console.log(gs.name) // xiaoming
gs.name = 'daming'
// console.log(gs.name) // daming
// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。就是对象访问器属性

// 3. 静态方法
// 静态方法，关键字static，不会被实例继承，而是直接拿来使用
// 静态方法可以背子类继承。

class StaticMethod {
  constructor() {}
  static sayHelo() {
    console.log('hahaha')
  }
}
StaticMethod.sayHelo() // hahaha
let sm = new StaticMethod()
// sm.sayHelo() // TypeError: sm.sayHelo is not a function

class ChildStatic extends StaticMethod {
  constructor() {
    super()
  }
}
ChildStatic.sayHelo() // hahaha

// 4. 实例属性放在类的最顶层
class TopProperty {
  _name;
  _age;
  _sex;
  constructor(name, age, sex) {
    this._name = name
    this._age = age
    this._sex = sex
  }
}
console.log(new TopProperty('xiaoming', 27, 'male'))
// { _name: 'xiaoming', _age: 27, _sex: 'male' }
// 注，低版本的node兼容不好。换最新版本后真香

// 5.静态属性
// 目前仅支持静态方法，如果一定要加，则只能如下方式
class StaticProp {}
StaticProp.pro1 = 'haha'

// 6. 私有方法和属性
// 不支持

// 7. new.target属性：确保类的调用形式
// 该属性一般用于构造函数之中，返回new命令作用于的那个构造函数
// 如果构造函数不是通过new命令或者Reflect.construct()调用。
// new.target会返回undefined

class Target {
  constructor(name) {
    console.log(new.target)
    if (new.target === Target) {
      throw new Error('不能直接实例化该类')
    } else {
      this.name = name
    }
  }
}

console.log(new Target('hello'))