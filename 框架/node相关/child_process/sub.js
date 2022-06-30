const process = require("process");

process.on('message', function (m) {
  console.log('CHILD got message:', m);
});

process.send({foo: 'bar'});