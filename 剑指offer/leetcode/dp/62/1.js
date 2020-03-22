/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// var uniquePaths = function (m, n) {
//   if (m == 1 && n == 1) return 1
//   if (m == 1 || n == 1) return 1
//   if (m <= 0 || n <= 0) return 0
//   return uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
// };

/**
 * 递归因为overlap，会超时。
 */

var uniquePaths = function (m, n) {
  let dp = []
  for (let i = 0; i < m; i++) {
    if (!dp[i]) dp[i] = []
    dp[i][0] = true
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = true
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}

console.log(uniquePaths(3, 2))
console.log(uniquePaths(7, 3))