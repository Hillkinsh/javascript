const fs = require('fs')

function writeFile (path) {
  fs.writeFile(path, 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}

writeFile('./text/write.txt')

let buffer = Buffer.from(`
  writeFile('write.txt')
  let buffer = Buffer.from('')
  function createWriteStream(path, buffer) {
    let out = fs.createWriteStream(path)
    out.write(buffer);
    out.end();
  }
  createWriteStream('writeStream.txt')`
)
function createWriteStream(path, buffer) {
  let out = fs.createWriteStream(path)
  out.write(Buffer.from(buffer));
  out.end();
}
createWriteStream('./text/writeStream.txt', buffer)