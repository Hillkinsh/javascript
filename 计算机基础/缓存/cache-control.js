// import http from 'http'
const http = require('http');

let server = http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.end('<h1><a target="_target" href="/a">open it</a></h1>')
})

server.listen(3333);