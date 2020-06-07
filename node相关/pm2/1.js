// 是管理node服务的

var http = require("http");

function reqFn (request, response) {
  // 处理请求 request
  console.log("Request received.");
  // 处理相应 response
  response.writeHead(200,  {"Content-Type":  "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(reqFn).listen(8888);