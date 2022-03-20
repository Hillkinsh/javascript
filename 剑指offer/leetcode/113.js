/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
 var pathSum = function(root, targetSum) {
  var result = [];
  pathCur(root, 0, [], targetSum, result);
  return result;
};
function pathCur(root, sum, pathArr, targetSum, result) {
  if (!root) {
    return;
  }
  pathArr = [].concat(pathArr);
  sum += root.val;
  pathArr.push(root.val);
  if (sum === targetSum && !root.left && !root.right) {
    result.push(pathArr);
    return;
  }
  root.left && pathCur(root.left, sum, pathArr, targetSum, result);
  root.right && pathCur(root.right, sum, pathArr, targetSum, result);
}