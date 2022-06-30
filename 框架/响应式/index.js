let Oberver = require('./observer.js')
let Watcher = require('./watcher.js').Watcher
let value = {
  a: 'hello'
}

function observe(value) {
  new Oberver(value)
}

observe(value)

value.a // 

value.a = 'heheh' // setter

new Watcher(value, 'a', function (value, oldValue) { // 对属性添加watcher
  console.log('观察到数据的变化，我可以做点事情了')
})

value.a = 'hi' // 观察到数据的变化，我可以做点事情了