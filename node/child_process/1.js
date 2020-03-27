// 创建子进程
// spawn()，fork()，exec()，execFile()

const cp = require('child_process');

cp.exec('echo hello world', (err, stdout) => {
  console.log(stdout)
})

cp.execFile('echo', ['hello', 'worldhahaha'], (err, stdout) => {
  console.log(stdout)
})

let cat=cp.spawn('cat',['input.txt']);
let sort=cp.spawn('sort');
let uniq=cp.spawn('uniq');

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);
console.log(process.stdout);
