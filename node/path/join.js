const path = require('path')
// 主要是拼接路径

console.log(path.join('abc', 'def'))
console.log(path.join('/abc', 'def'))
console.log(path.join('abc', '../def'))
console.log(path.join('/abc', '../def'))

// abc/def
// /abc/def
// def
// /def