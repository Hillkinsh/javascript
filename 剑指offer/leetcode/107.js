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
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  let curLevel = 0;
  let res = [];
  let stack = [];
  if (root) {
    stack.push(root);
  }
  while(stack.length) {
    let len = stack.length;
    res[curLevel] = [];
    for (let i = 0; i < len; i++) {
      const node = stack.shift();
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
      res[curLevel].push(node.val);
    }
    curLevel++;
  }
  return res;
};
 var levelOrderBottom = function(root) {
  const result = [];
  const levelArr = levelOrder(root);
  for (let i = 0; i < levelArr.length; i++) {
    result[i] = levelArr[levelArr.length - i - 1];
  }
  return result;
};