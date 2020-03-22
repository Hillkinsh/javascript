const path = require('path')
// 将相对路径转为绝对路径
console.log(path.resolve('abc/def','efdd'))
console.log(path.resolve('abc/def','./efdd'))
console.log(path.resolve('abc/def','../efdd'))
console.log(path.resolve('/abc/def','efdd/acd'))

// /Users/xuqingshan/Documents/git/javascript/node/path/abc/def/efdd
// /Users/xuqingshan/Documents/git/javascript/node/path/abc/def/efdd
// /Users/xuqingshan/Documents/git/javascript/node/path/abc/efdd
// /abc/def/efdd/acd