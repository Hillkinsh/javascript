
var {
  fork,
  spawn,
  exec,
  execFile
}= require('child_process');
var cpus = require('os').cpus();

// 创建子进程的4种方法：
spawn('node', ['worker.js']);

fork('./worker.js');

exec('node worker.js', function (err, stdout, stderr) {
  // some code
  console.log('stdout:', stdout)
});

execFile('worker.js', function (err, stdout, stderr) {
  // some code
});

