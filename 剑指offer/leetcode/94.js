/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const result = [];
  inorder(root, result);
  return result;
  function inorder(root, result) {
    if (root) {
      root.left && inorder(root.left, result);
      result.push(root.val);
      root.right && inorder(root.right, result);
    }
  }
};

// 非递归实现。

