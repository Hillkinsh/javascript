var fs = require('fs');
var rs = fs.createReadStream('./data', {highWaterMark:11});
var data = '';
rs.on("data", function (chunk){
data += chunk;
});
rs.on("end", function () {
console.log(data);
});