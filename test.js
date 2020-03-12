// 构造继承
// function SuperFn (name, age, color) {
//   this.name = name || 'tommy'
//   this.age = age || 28
//   this.color = color || '#fff'
//   this.getName = function () {
//     return this.name
//   }
//   this.getAge = function () {
//     return this.age
//   }
//   this.getColor = function () {
//     return this.color
//   }
//   this.setName = function (newName) {
//     this.name = newName
//   }
// }
// function SuperFn2 (name, age, color) {
//   this.name = name || 'tommywwww'
//   // this.age = age || 218
//   this.color = color || '#222fff'
//   this.getName = function () {
//     return this.name
//   }
//   // this.getAge = function () {
//   //   return this.age
//   // }
//   this.getColor = function () {
//     return this.color
//   }
//   this.setName = function (newName) {
//     this.name = newName
//   }
// }

// let a = new SuperFn('xiaoming', 28, 'green')
// console.log(a.getName())
// a.setName('ahahah')
// console.log(a.getName())

// function Sub() {
//   SuperFn.call(this, 'ahahah', 27, 'red')
//   SuperFn2.call(this)
// }

// let bo = new Sub()

// console.log(bo)

// 原型链继承

// sub.prototype = new Super()

/**
 * 存在的最大问题：如果父构造器上有引用类型值，那么将在子类的实例上共享。
 */

 function Super (name, age) {
   this.name = name || 'john'
   this.age = age || 25
   this.friends = ['tomi', 'bolo']
   this.getFriends = function (i=0) {
     return this.friends[i]
   }
 }

 function Sub (name, age) {
   this.__proto__ = new Super(name, age)
 }

 let sb = new Sub('xio', 3)
 let sb2 = new Sub('sb2', 4)
 sb.friends.push('hehehi')
 console.log(sb.friends) // ['tomi', 'bolo', 'hehehi']
 console.log(sb.friends) // ['tomi', 'bolo', 'hehehi']