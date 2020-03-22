/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {

  let count = 0
  let isAdd = dividend <= 0 && divisor < 0 || dividend >= 0 && divisor > 0

  dividend = dividend >= 0 ? dividend : -dividend
  divisor = divisor >= 0 ? divisor : -divisor
  if (dividend == divisor) {
    return isAdd ? 1 : -1
  }
  if (divisor === 1) {
    return isAdd ? Math.min(dividend, Math.pow(2, 31) - 1) : Math.max(-dividend, -Math.pow(2, 31))
  }
  while (dividend > divisor) {
    dividend -= divisor
    count = isAdd ? count + 1 : count - 1
  }
  return count > 0 ? Math.min(count, Math.pow(2, 31) - 1) : Math.max(count, -Math.pow(2, 31))
};
let dividend = 10,
  divisor = 3
console.log(divide(dividend, divisor))

/**
 * 简单做差，遇到大数则很慢，
 * 因此简单做差不可取
 */