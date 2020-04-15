// Buffer.alloc()

// Buffer.alloc(size[, fill[, encoding]])

let buf = Buffer.alloc(5)

console.log(buf)

let buf2 = Buffer.alloc(5, 'a')
console.log(buf2)

let buf3 = Buffer.alloc(5, 'a', 'utf8')
console.log(buf3)