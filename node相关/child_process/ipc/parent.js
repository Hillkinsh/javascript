let cp = require('child_process')

let child = cp.fork('./child')
let longComputed = cp.fork('longComsume');

child.on('message', function (msg) { // 接收子进程传递的消息
  console.log('got a message from child, is: ', msg)
})

longComputed.send('start');
longComputed.on('message', (sum) => {
  console.log('sum is : ', sum)
})
longComputed.on('message')

child.send('hello world') // 向子进程传递消息