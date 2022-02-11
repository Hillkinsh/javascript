// Buffer.alloc()
// Buffer.alloc(size[, fill[, encoding]])
// 虽然 Buffer 类在全局作用域内可用，但仍然建议通过 import 或 require 语句显式地引用它。
// 创建缓冲区。
const { Buffer } = require('buffer');
console.log('Buffer:', Buffer)
let buf = Buffer.alloc(5)

console.log(buf)

let buf2 = Buffer.alloc(5, 'a')
console.log(buf2)

let buf3 = Buffer.alloc(5, 'a', 'utf8')
console.log(buf3)