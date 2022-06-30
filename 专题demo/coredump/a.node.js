// 模拟内存泄漏，分析heapdump，并找出该对象
// require('heapdump');
const leaks = [];
function LeakingClass(){
    this.name = Math.random().toString(36);
    this.age = Math.floor(Math.random() * 100);
    this.arr = new Array(10000);
}

setInterval(()=>{
    for (let i = 0; i < 100; i++) {
        leaks.push(new LeakingClass)
    }
    console.warn('Leaks: %d', leaks.length);
},1000);

// # --测试heapdump--
// node a.node.js         # 控制台运行该程序
// ps aux|grep a.node.js  # 查询进程ID
// kill -31 [PID]         # 生成heapdump
