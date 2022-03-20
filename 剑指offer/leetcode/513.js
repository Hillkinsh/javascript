/**
 * @param {TreeNode} root
 * @return {number}
 */
 var findBottomLeftValue = function(root) {
  const result = [];
  const arr = [];
  if (root) {
    arr.push(root);
  }

  while(arr.length) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      node = arr.shift();
      if (i === 0) {
        result.push(node.val);
      }
      node.left && arr.push(node.left);
      node.right && arr.push(node.right);
    }
  }
  return result[result.length - 1];
};