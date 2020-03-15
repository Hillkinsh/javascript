const fs = require('fs')

function readFile (path) {
  fs.readFile(path, (err, buffer) => {
    if (err) throw err
    console.log(buffer.toString())
  })
  // readFile 异步读取文件，函数会缓冲整个文件。 
  // 为了最小化内存成本，尽可能通过 fs.createReadStream() 进行流式传输。
}
readFile('./text/data.txt')

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
}

var input = fs.createReadStream('./text/data.txt');
readLines(input, func);







