// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

//  

// 示例 1：

// 输入：x = 4
// 输出：2
// 示例 2：

// 输入：x = 8
// 输出：2
// 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。

/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function(x) {
  let i = 0;
  let j = x;
  while(i <= j) {
    let mid = i + ((j - i) >> 1)
    let mul = mid * mid;
    // console.log('i:', mul, x)
    if (x === mul) {
      return mid;
    } else if (x > mul) {
      i = mid + 1;
    } else {
      j = mid - 1;
    }
  }
  return j;
};
console.log(mySqrt(0))
console.log(mySqrt(1))
console.log(mySqrt(2))
console.log(mySqrt(3))
console.log(mySqrt(4))
console.log(mySqrt(5))
console.log(mySqrt(6))
console.log(mySqrt(7))
console.log(mySqrt(8))
console.log(mySqrt(9))
console.log(mySqrt(10))