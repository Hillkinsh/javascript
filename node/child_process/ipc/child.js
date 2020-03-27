process.on('message', function (msg) {
  let result = 'I am child, and hello ' + msg
  process.send(result)
})