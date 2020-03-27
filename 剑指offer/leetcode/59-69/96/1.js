/**
 * @param {number} n
 * @return {number}
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * 思路：关键是这个推导式：
 * 1），G(n) = f(1) + f(2) + ... + f(n)
 * // fn 是以n为跟节点的树个数
 * f(n) 其左子树节点个数为[1,2,3,...,i-1]，右子树节点个数为[i+1,i+2,...n]
 * f(n) = G(0)*G(n-1)  + G(1)*G(n-2) + ... + G(n-1)* G(0)
 * G(1) = f(1)
 * f(1) = 1
 * 
 */
var numTrees = function (n) {
  let dp = [1, 1]
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (!dp[i]) dp[i] = 0
      dp[i] = dp[i] + dp[j] * dp[i - 1 - j]
    }
  }
  return dp[n]
};
console.log(numTrees(3))