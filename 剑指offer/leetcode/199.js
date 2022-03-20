/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var rightSideView = function(root) {
  const stack = [];
  const result = [];
  if (root) {
    stack.push(root);
  }
  while(stack.length) {
    const len = stack.length;
    for (let i = 0; i < len; i++) {
      const node = stack.shift();
      if (i === len - 1) {
        result.push(node.val);
      }
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
    }
  }
  return result;
};