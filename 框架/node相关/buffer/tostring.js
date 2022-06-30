let buf = Buffer.from('hello world.')
console.log(buf.toString('utf8', 2, 7)) // llo w


// buf.write(string[, offset[, length]][, encoding]) 返回一个length
let write = Buffer.alloc(120)
let len = write.write('\u00bd + \u00bc = \u00be')

console.log(write.toString('utf8', 0, len)) // ½ + ¼ = ¾
// console.log(w2)

// copy 
// buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])
let write2 = Buffer.alloc(15)
let cp = write.copy(write2, 0, 0, len)
console.log(write2) // <Buffer c2 bd 20 2b 20 c2 bc 20 3d 20 c2 be 00 00 00>