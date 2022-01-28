// import http from 'http'
const http = require('http');

let server = http.createServer((req, res) => {
  console.log(req.url, req.headers['if-none-match'])
  if (req.headers['if-none-match']) {
    // 检查文件版本
    res.statusCode = 304
    res.end()
  }
  else {
    res.setHeader('Etag', '00000000')
    res.end('harttle.land')
  }
})
server.listen(3334)
