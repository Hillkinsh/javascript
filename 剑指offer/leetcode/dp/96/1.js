/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  let dp = [1, 1]
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (!dp[i]) dp[i] = 0
      dp[i] += dp[j - 1] * dp[i - j]
      // g(n) = 
      // console.log(dp)
    }
  }
  return dp[n]
};
/**
 * 思路：关键是这个推导式：
 * 1），G(n) = f(1) + f(2) + ... + f(n)
 * // fn 是以n为跟节点的树个数
 * f(n) 其左子树节点个数为[1,2,3,...,i-1]，右子树节点个数为[i+1,i+2,...n]
 * f(n) = g(0)*g(n-1)  + g(1)*g(n-2) + ... + g(n-1)* g(0)
 */
// console.log(numTrees(3))
// console.log(numTrees(2))