var http = require('http');
var fs = require('fs');
const { Console } = require('console');

const outFile = fs.createWriteStream('./outPut.log');
const errFile = fs.createWriteStream('./errPut.log');

let logger = new Console({
  stdout: outFile,
  stderr: errFile
});

// 日志文件有些问题。
function loggerOut(err) {
  console.log('......日志输出.....', err);
  logger.log('err.toString()');
}

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('handled by child, pid is ' + process.pid + '\n');
  throw new Error('throw exception');
});

var worker;
process.on('message', function (m, tcp) {
  if (m === 'server') {
    worker = tcp;
    worker.on('connection', function (socket) {
      server.emit('connection', socket);
    });
  }
});

process.on('uncaughtException', function (err, origin) {

  loggerOut(err)

  process.send({act: 'suicide', err: err, origin: origin});

  // 停止接受新的链接
  worker.close(function () {
    // 所有的链接断开后，退出进程。
    process.exit(1);
  });

  // 5s后退出进程
  setTimeout(function () {
    process.exit(1);
  }, 5000);
});
