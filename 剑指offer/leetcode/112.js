/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
 var hasPathSum = function(root, targetSum) {
  if (!root) return false;
  return treeCur(root.left, root.val, targetSum) || treeCur(root.right, root.val, targetSum);
};
function treeCur(root, sum, targetSum) {
  if (!root) {
    return sum === targetSum;
  }
  sum += root.val;
  return treeCur(root.left, sum, targetSum) || treeCur(root.right, sum, targetSum);
}