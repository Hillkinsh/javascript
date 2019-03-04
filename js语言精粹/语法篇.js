// 1. 注释
// 应该避免使用 /* */

// 比如下面代码会出错

// /**
//  * 
//  * var rm_a = /a*/.match(s)
//  */

// 2. 对象属性值检索
//   当该属性值不存在时，返回undefined。
// 可通过 || 运算符填充默认值。
// 当从undefined的成员属性中取值，会导致TypeError。可通过&& 运算符来避免这种错误。

let obj = {name: 'xiaoming', sex:0}
obj.age // undefined.
obj.sex // 0

obj.age || '28'

obj.comp && obj.comp.salary
