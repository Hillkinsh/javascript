const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  let src = fs.createReadStream('./bigFile')
    src.pipe(res)
})

server.listen(3000, _ => console.log('server is running.'))