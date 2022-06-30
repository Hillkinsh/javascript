const cluster = require('cluster');
const http = require('http')
const numsCPUs = require('os').cpus().length;

/**
 * cluster 集群
工作原理
Worker 类
  'disconnect' 事件
  'error' 事件
  'exit' 事件
  'listening' 事件
  'message' 事件
  'online' 事件
  worker.disconnect()
  worker.exitedAfterDisconnect
  worker.id
  worker.isConnected()
  worker.isDead()
  worker.kill([signal])
  worker.process
  worker.send(message[, sendHandle[, options]][, callback])
  'disconnect' 事件
  'exit' 事件
  'fork' 事件
  'listening' 事件
  'message' 事件
  'online' 事件
  'setup' 事件
cluster.disconnect([callback])
cluster.fork([env])
cluster.isMaster
cluster.isPrimary
cluster.isWorker
cluster.schedulingPolicy
cluster.settings
cluster.setupMaster([settings])
cluster.setupPrimary([settings])
cluster.worker
cluster.workers
 */
if (cluster.isMaster) { // 主进程
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // 衍生工作进程。
  for (let i = 0; i < numsCPUs; i++) {
    cluster.fork();
  }

  // 
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  // 当任何工作进程死亡时，则集群模块将触发 'exit' 事件。
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    console.log('code: ', code)
    console.log('signal: ', signal)
    console.log('Starting a new worker');
    cluster.fork();
  });

  let numReqs = 0;
  // 计数请求
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      console.log('updating numreqs: ', numReqs);
      numReqs += 1;
    }
  }
  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else { // 工作进程
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。

  console.log(`工作进程 ${process.pid} 已启动`);

  http.createServer((req, res) => {
    console.log(req.url)
    res.writeHead(200);
    res.end('你好世界\n');
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);

  const worker = cluster.worker;

  worker.on("disconnect", () => {
    console.log('工作进程已断开连接: ' + process.pid);
  })

  

 
}