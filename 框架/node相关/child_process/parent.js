var cp = require('child_process');

var n = cp.fork(__dirname + '/sub.js');

// 父子进程会创建ipc通道

n.on('message', function (m) {
  console.log('PARENT got message:', m);
});

n.send({hello: 'world'});