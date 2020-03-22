/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (!s || s.length == 1 && s[0] == '0') return 0
  let dp = [1]
  for (let i = 0; i < s.length; i++) {
    /**
     * 当前数字如果为0，那么只能dp[i+1] = dp[i-1] // 一种情况
     * 当前数字不为0，dp[i+1] = dp[i] 如果本身还能拼，则dp[i+1] = dp[i] + dp
     */
    dp[i + 1] = s[i] == '0' ? 0 : dp[i]
    if (i > 0 && (s[i] == 1 || s[i - 1] == 2 && s[i] - 6 <= 0)) {
      dp[i + 1] += dp[i - 1]
    }
  }
  return dp[dp.length - 1]
  // console.log(dp)
};

console.log(numDecodings('226'))