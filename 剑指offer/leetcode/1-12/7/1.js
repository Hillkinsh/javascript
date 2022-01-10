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
var rev2 = function (x) {
  const sign = x < 0 ? -1 : 1;
  x = sign === -1 ? -1 * x : x;
  let result = 0;
  while(x >= 1) {
    const digit = x % 10;
    x /= 10;
    x = Math.floor(x);
    result = result * 10 + digit;
  }
  result = result * sign;
  if (result < - (2 ** 31) || result > (2 ** 31 - 1)) {
    result = 0;
  }
  return result;
}

// console.log(reverse(123))
console.log(rev2(123))
console.log(rev2(-123))
console.log(rev2(1534236469))
console.log(reverse(1534236469))