// 1.常用的数据类型

// string, boolearn, number, null, undefined, symbol
// object, array, function

// 2. 数据类型检测

// 1. typeof null会被返回object
// 2. instance 只能判断实例关系，不能判断数据类型
// 3. Object.prototype.toString方法
// 4. constructor

// 存在问题： null undefined 没有constructor方法。
// 2. 如果手动改了constructor，体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object
