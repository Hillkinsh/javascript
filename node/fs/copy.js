/**
 * 利用读写流复制大文件
 */
const fs = require('fs')
 function copy (source, target, cb) {
  const input = fs.createReadStream(source)
  const output = fs.createWriteStream(target)
  input.on('data', data => {
    output.write(data)
  })
  input.on('error', err => { throw err })
  input.on('end', () => {
    output.end()
    cb && cb()
  })
 }

 copy('./text/data.txt', './text/cp.txt', () => console.log('copy done!'))