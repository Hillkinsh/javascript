var http = require('http')
var fs = require('fs')
const path = require('path')
var server = http.createServer()

server.on('request', function (req, res) {
  console.log(req.url)
  var url = req.url
  fs.readFile(path.join(__dirname, url), (err, data) => {
    if (err) return res.end('404 not found.')
    res.end(data)
  })
})

server.listen(8000, function () {
  console.log('running at port: 8000')
})