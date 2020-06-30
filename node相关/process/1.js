// process属性
// 当前node进程的信息，并加以控制。

process.execPath // 返回node的绝对路径
// console.log(process.execPath) // /Users/xuqingshan/.nvm/versions/node/v12.10.0/bin/node
process.version // node version
// console.log(process.version)
process.versions
// console.log(process.versions)
// process.stdin
// console.log(process.stdin)
// process.stdout

// process.stderr
// process.argv
// process.env
// process.config
// process.pid
// process.title
// process.arch

process.on('beforeExit', (code) => {
  console.log('进程 beforeExit 事件的代码: ', code);
});

process.on('exit', (code) => {
  console.log('进程 exit 事件的代码: ', code);
});

console.log('此消息最新显示');

console.log(process.cpuUsage())

console.log(process.arch)
