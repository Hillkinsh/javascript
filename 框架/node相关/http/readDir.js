const fs = require('fs')

fs.readdir(__dirname, (err, data) => {
  if (err)  throw err
  console.log(data)
})