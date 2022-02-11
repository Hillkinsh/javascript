const process = require('process');
const fs = require('fs');


// 标准输出
fs.createReadStream('wo.txt')
  .pipe(process.stdout);

// process.stdin.setEncoding('utf8')

// process.stdin.on('readable', () => {
//   let chunk
//   while ((chunk = process.stdin.read()) !== null) {
//     process.stdout.write(`data: ${chunk}`)
//   }
// })

// process.stdin.on('end', () => {
//   process.stdout.write('end')
// })