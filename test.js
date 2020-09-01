var fs = require('fs')
  , gm = require('gm');
 
 let x = 20, y = 20;
// annotate an image
let img = gm(300, 300, '#ffffff');
img.drawText(0, y + 80, 'hello world.');
img.fill('yellow'); // 填充
img.stroke('#B79FE2');
img.fontSize(30);
console.log(img.drawText)
img.drawText(0, 0, "from scratch", 'Center');
// img.fill('red');
// img.stroke('#B79FE2');
// img.drawRectangle(x+ 60, y+ 60, x + 204, y + 200);
// // img.drawText(0, y + 80, 'hello world.');
// // img.fill('#000000');
// // img.stroke('#ffffff');
// // img.drawText(0, y + 80, 'hello world.');
// // img.fontSize(10);
// // img.drawText(0, y + 80, 'hello world.');


img.write("./drawing2.png", function (err) {
  console.log('finish.')
  if (!err) console.log('done');
});