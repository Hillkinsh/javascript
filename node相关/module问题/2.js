let Hi = require('./1')

console.log(typeof Hi)
new Hi('hello world.')

/**
 * 这里是同步一下module.exports 用法，
 * exports是module.exports的引用。
 * 当require时，引进来的是module.exports
 * 所以require(./1) 得到的是一个函数对象
 * 
 */