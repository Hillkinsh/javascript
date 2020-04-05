// 原生类型可以被用作原生类型的构造器，构造的结果是是一个基本类型值的包装器对象。
// 比如：下面的例子
let a = new String('abc')

typeof a // object
console.log(a) // String{'abc'} 返回一个字符串的包装器对象

// 手动装箱
let strA = Object('abc')

console.log(a)

'abc'.length // 对基本类型进行自动封箱，满足这个属性访问

// 开箱
// 对包装器对象，取出底层基本类型，使用valueOf
a.valueOf() // abc

