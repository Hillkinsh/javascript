let Oberver = require('./observer.js')

let value = {
  a: 'hello'
}

// console.log(Oberver)
function observe(value) {
  new Oberver(value)
}
observe(value)
value.a
value.a = 'heheh'
module.exports = observe