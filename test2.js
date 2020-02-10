var getSum = function (a, b) {
  let sum, carry
  sum = a ^ b;
  carry = (a & b) << 1
  if (carry) {
    return getSum(sum, carry)
  }
  return sum
}
console.log(getSum(3, 6))