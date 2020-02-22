/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n < 0) {
    x = 1 / x
    n = -n
  }

  function fastPow(x, n) {
    if (n == 0) {
      return 1.0
    }
    var half = fastPow(x, ~~(n / 2))
    if (n % 2 == 0) {
      return half * half
    } else {
      return half * half * x;
    }
  }
  return fastPow(x, n)
};