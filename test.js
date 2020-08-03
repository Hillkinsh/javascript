let Hi = require('./test2')

console.log(typeof Hi)
new Hi('hello world.')

const fs = require('fs');
const path = require('path');
fs.unlinkSync(path.join(__dirname, 'a'));
fs.unlinkSync(path.join(__dirname, 'b'));
fs.unlinkSync(path.join(__dirname, 'c'));
fs.unlinkSync(path.join(__dirname, 'd'));
fs.unlinkSync(path.join(__dirname, 'e'));