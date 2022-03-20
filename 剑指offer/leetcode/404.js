/**
 * @param {TreeNode} root
 * @return {number}
 */
 var sumOfLeftLeaves = function(root) {
  let sum = 0;
  let arr = [];
  if (root) {
    arr.push(root);
    if (!root.left && !root.right) {
      sum += root.val;
    }
  }
  while(arr.length) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      const node = arr.shift();
      if (node && node.left && !node.left.left && !node.left.right) {
        sum += node.left.val;
      }
      node.left && arr.push(node.left);
      node.right && arr.push(node.right);
    }
  }
  return sum;
};

var root = {
  val: 1,
}
console.log(sumOfLeftLeaves(root))