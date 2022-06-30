const fs = require('fs')
const http = require('http')
const path = require('path')
const server = http.createServer()

server.on('request', function (req, res) {
  console.log(req.url)
  var url = req.url
  fs.readFile(path.join(__dirname, url), (err, data) => {
    if (err) return res.end('404 not found.')
    res.end(data)
  })
})
server.listen('8080', _ => console.log('server is running '))