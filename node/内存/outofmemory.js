var showMem = function () {
  var mem = process.memoryUsage();
  var format = function (bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };
  console.log('Process: heapTotal ' + format(mem.heapTotal) +
  ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
  console.log('-----------------------------------------------------------');
};

  var useMem = function () {
    var size = 200 * 1024 * 1024;
    var arr = new Buffer(size);
    for (var i = 0; i < size; i++) {
    arr[i] = 0;
    }
    return arr;
  };
  var total = [];
  for (var j = 0; j < 145; j++) {
  showMem();
  total.push(useMem());
  }
  showMem();

//   rss是resident set size的缩写写，进程的常驻内存部分。
// 进程的内存有几部分，
// 一部分是rss，其余部分在交换区（swap）或者文件系统（filesystem）中。
// 除了rss外，
// heapTotal和heapUsed对应的是V8的堆内存信息。
// heapTotal是堆中总共申请的内存量，
// heapUsed表示目前堆中使用中的内存量