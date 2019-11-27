// Number 类型表示我们通常意义上的“数字”。
// 这个数字大致对应数学中的有理数，当然，在计算机中，我们有一定的精度限制
// JavaScript 中的 Number 类型基本符合 IEEE 754-2008 规定的双精度浮点数规则
// jsNumber类型的数字是双精度浮点数


// 根据双精度浮点数的定义，Number 类型中
// 有效的整数范围是 -0x1fffffffffffff 至 0x1fffffffffffff，
// 所以 Number 无法精确表示此范围外的整数。
// 而根据浮点数的定义，无法用 == 和 === 来比较

// 上面的结果返回false，就是浮点数运算的特点。浮点数运算的精度问题
// 导致左右两边不是严格相等。而是相差了微小的值
// 所以是比较方法的问题。正确的比较方法是：
// Math.abs()


function numberEquals(a, b) {
  // 是否是数字类型
  let isNumberType = (typeof a === 'number') && (typeof b === 'number')
  // 是否是NaN
  let isNaN = Number.isNaN(a) || Number.isNaN(b)
  if (isNumberType && !isNaN) {
    return Math.abs(a - b) <= Number.EPSILON
  } else {
    throw Error('请输入正确的参数类型')
  }
}

console.log(numberEquals(0.1 + 0.2, 0.3))