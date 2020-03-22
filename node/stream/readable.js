var Readable = require('stream').Readable;

var rs = new Readable();
rs.push('beep ');
rs.push('boop\n');
rs.push(null);

rs.pipe(process.stdout);
// 可读数据流的push方法，用来将数据输入缓存。rs.push(null)中的null，用来告诉rs，数据输入完毕

// 可读数据流有两种状态：流动态和暂停态
// 处于流动态时，数据会尽快地从数据源导向用户的程序；
// 处于暂停态时，必须显式调用stream.read()等指令，“可读数据流”才会释放数据。
// 刚刚新建的时候，“可读数据流”处于暂停态。


// 三种方法可以让暂停态转为流动态。

// 1. 添加data事件的监听函数
// 2. 调用resume方法
// 3. 调用pipe方法将数据送往一个可写数据流
// 如果转为流动态时，没有data事件的监听函数，也没有pipe方法的目的地，那么数据将遗失。

// 以下两种方法可以让流动态转为暂停态。

// 1. 不存在pipe方法的目的地时，调用pause方法
// 2. 存在pipe方法的目的地时，移除所有data事件的监听函数，并且调用unpipe方法，移除所有pipe方法的目的地

var fs = require('fs');
var readableStream = fs.createReadStream('index.js');
var data = '';

readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
  data+=chunk;
});

readableStream.on('end', function() {
  console.log(data);
});

// pipe()
// pipe方法是自动传送数据的机制，就像管道一样。它从“可读数据流”读出所有数据，将其写出指定的目的地。整个过程是自动的。

// src.pipe(dst)
// pipe方法必须在可读数据流上调用，它的参数必须是可写数据流。

var readableStream = fs.createReadStream('file1.txt');
var writableStream = fs.createWriteStream('file2.txt');

readableStream.pipe(writableStream);