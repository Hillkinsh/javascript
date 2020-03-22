var net = require('net');
var server = net.createServer(function (socket) {
  // 􁂎的􀫶接
  socket.on('data', function (data) {
    socket.write("socket on data");
  });
  socket.on('end', function () {
    console.log('socket on end');
  });
  socket.write("socket write 入􀴱出No\n");
});
server.listen(8124, function () {
  console.log('server bound');
});