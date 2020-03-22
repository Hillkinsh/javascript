/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let result = []
  let backtrack = (result, ans, countLeft, countRight, n) => {
    if (countLeft < countRight || countLeft > n || countRight > n) return
    if (countLeft === n && countRight === n) {
      result.push(ans)
      return
    }
    backtrack(result, ans + ')', countLeft, countRight + 1, n)
    backtrack(result, ans + '(', countLeft + 1, countRight, n)
  }
  backtrack(result, '(', 1, 0, n)
  return result
};
/**
 * 优化思路： 初始化那里，不用空串
 */
console.log(generateParenthesis(3))