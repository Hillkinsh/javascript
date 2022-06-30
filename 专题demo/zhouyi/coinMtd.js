
// 110少阳，100少阴，000老阳，111老阴
// return 
// 太阳：⚌ 少阴：⚍
// 少阳：⚎ 太阴：⚏
const guaObj = require('./guaList');
function yao () {
  const out = {
    "110": "⚎", // 少阳
    "100": "⚍", // 少阴
    "000": "⚌", // 老阳
    "111": "⚏", // 老阴
  }
  let arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(Math.random() > .5 ? 1:0);
  }

  arr.sort((a, b) => -a + b);
  const res = arr.join('');

  return out[res];
}


function gua () {
  let result = "";
  for (let i = 0; i < 3; i++) {
    result += yao();
  }
  console.log('result: ', result)
  return result;
}

function guaRes(str) {
  return guaObj[str]
}
// console.log(yao())
// console.log(gua())

const guaStr = gua();
console.log(guaRes(guaStr))