// 创建buffer

// Buffer.from()

// 1.array
let array = [1,2,3,4]
let buf = Buffer.from(array)

console.log(buf)

// 2.string
let str = 'hello world.'
let strBuf = Buffer.from(str)
let strBuf2 = Buffer.from(str, 'utf8')
console.log(strBuf, strBuf2)

// 3. object <Object> 支持 Symbol.toPrimitive 或 valueOf() 的对象
let obj = {
  [Symbol.toPrimitive] () { return 'hello world' }
}

let objBuf = Buffer.from(obj)
objBuf2 = Buffer.from(obj, 'utf8')

console.log(objBuf)
console.log(objBuf2)
