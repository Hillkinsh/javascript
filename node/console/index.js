// 控制台标准输出
console.log('标准控制台输出，console.log')

// node index.js 1>>info.log 1.代表重定向标准输出流，追加
// node index.js 1>info.log 覆盖

// 标准错误输出流
console.error('服务器内部错误')
// node index.js 2>info.log 覆盖 2代表重定向标准错误输出流

var user=new Object();
user.name="Lulingniu";
user.getName=function(){return this.name;};
user.setName=function(name){this.name=name;};
console.dir(user)
console.log(user)

// 统计时间
console.time('haha')
console.timeEnd('haha')

// console.trace 将当前位置处的栈信息作为标准错误信息进行输出

console.trace(user.name)