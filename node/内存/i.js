var str = 'hello world nodejs 233, 33'

var buffer = Buffer.from(str, 'utf8')
var alloc = Buffer.alloc(10, 253)
var alcunsafe = Buffer.allocUnsafe(10)

// console.log(buffer, alloc,alcunsafe, Buffer.poolSize)

for (const b of buffer) {
  console.log(b)
}