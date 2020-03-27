let cp = require('child_process')

let child = cp.fork('./child')

child.on('message', function (msg) {
  console.log('got a message from child, is: ', msg)
})
child.send('hello world')