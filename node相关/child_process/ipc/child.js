// 子进程接收主进程的消息
process.on('message', function (msg) {
  let result = 'I am child, and hello ' + msg
  process.send(result) // 向主进程发送消息。
})