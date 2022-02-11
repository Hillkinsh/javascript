var cp = require('child_process');

var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js');
var child3 = cp.fork('child.js');
var child4 = cp.fork('child.js');
var child5 = cp.fork('child.js');
var child6 = cp.fork('child.js');
var child7 = cp.fork('child.js');
// Open up the server object and send the handle
var server = require('net').createServer();

server.listen(1337, function () {
  child1.send('server', server);
  child2.send('server', server);
  child3.send('server', server);
  child4.send('server', server);
  child5.send('server', server);
  child6.send('server', server);
  child7.send('server', server);

  server.close();
});