// 模拟程序异常退出，分析core dump找出程序异常点——程序退出的位置
setTimeout(function delayedFailure(){
  throw new Error('Fail not really fast');
}, 500);

// # --测试coredump--
// ulimit -c unlimited                            # 开启coredump生成
// node --abort-on-uncaught-exception c.node.js   # 控制台运行node程序
// llnode node -c path/to/core-dump-file          # 分析coredump

/// Mac下进入 /cores 目录，找到coredump文件，文件名称形式为 core.[PID]
/// node启动时增加参数 --abort-on-uncaught-exception ，在程序奔溃时自动core dump
