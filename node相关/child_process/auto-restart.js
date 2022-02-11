// 自动重启
var fork = require('child_process').fork;
var cpus = require('os').cpus();
var server = require('net').createServer();

server.listen(1337);

var workers = {};
var createWorker = function () {
  var worker = fork(__dirname + '/auto-worker.js');

  // 启动新的进程
  worker.on('message', function (message) {
    if (message.act === 'suicide') {
      // console.log(message.origin, message.err)
      createWorker();
    }
  });

  // 子进程退出时重新启动新的进程
  worker.on('exit', function () {
    console.log('Worker ' + worker.pid + ' exited.');
    delete workers[worker.pid];
  });

  // 句柄转发
  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log('Create worker. pid: ' + worker.pid);
};

for (var i = 0; i < cpus.length; i++) {
  createWorker();
}

// 进程自己退出时，让所有工作进程退出
process.on('exit', function () {
  for (var pid in workers) {
    workers[pid].kill();
  }
});