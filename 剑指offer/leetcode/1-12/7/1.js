/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let mark = x < 0 ? -1 : 1
  x = x < 0 ? -x : x
  x = String(x)
  x = x.split('').reverse().join('')
  let bigNum = Math.pow(2, 31)
  if (mark == 1) {
    x = x - bigNum + 1 > 0 ? 0 : +x
  } else {
    x = x - bigNum > 0 ? 0 : -x
  }
  return x
};

console.log(reverse(123))