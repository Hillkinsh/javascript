var divide = function (dividend, divisor) {
  const LIMIT = 0x80000000
  const INT_MIN = Math.pow(2, 31)
  const INT_MAX = Math.pow(2, 31) - 1
  if (dividend == 0) return 0
  if (dividend == INT_MIN && divisor == -1) return INT_MAX

  let negative = (dividend ^ divisor) < 0 //用异或来计算是否符号相异
  let t = Math.abs(dividend) == INT_MIN ? LIMIT : Math.abs(dividend)
  let d = Math.abs(divisor) == INT_MIN ? LIMIT : Math.abs(divisor)

  let result = 0
  for (let i = 30; i >= 0; i--) {
    console.log(t >> i, d)
    if ((t >> i) >= d) { //找出足够大的数2^n*divisor
      console.log(t, i)
      result += 1 << i //将结果加上2^n
      t -= d << i //将被除数减去2^n*divisor
    }
  }
  console.log(result)
  if (result == LIMIT) { //特殊数不能将unsigned int转为int
    return INT_MIN;
  } else {
    return negative ? -result : result; //符号相异取反
  }
}

let dividend = 10,
  divisor = 3
// console.log(divide(dividend, divisor))
console.log(divide(-2147483648, 1))