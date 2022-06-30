// 模拟CPU使用过高，分析core dump找出执行耗时程序片段
// 一般情况下，对于Web程序而言，死循环最容易让CPU满载

const http = require('http')

const hostname = '127.0.0.1'

const port = 3000

const server = http.createServer((req, res) => {
    while(true){
        // 死循环，请求进入后，CPU满载
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('你好世界\n')
})

server.listen(port, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})

// # --测试coredump--
// node b.node.js        # 运行该程序
// ulimit -c unlimited   # 开启coredump
// ps aux|grep b.node.js # 查询进程ID
// sudo gcore [PID]      # 生成coredump

// # Mac OSX coredump文件生成后的保存路径为 /cores
// llnode node -c path/to/core-dump-file # 分析coredump
