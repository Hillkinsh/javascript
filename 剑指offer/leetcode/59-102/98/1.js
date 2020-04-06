/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 * @description 中序遍历
 */
var isValidBST = function(root) {
  if (!root) return true
  let result = null
  let stack = [[root, false]]
  while(stack.length) {
    let arr = stack.pop()
    let node = arr[0]
    let state = arr[1]
    if (state) {
      if (result !== null && result >= node.val) {
        return false
      }
      result = node.val
    } else {
      if (node.right) {
        stack.push([node.right, false])
      }
      stack.push([node, true])
      if (node.left) {
        stack.push([node.left, false])
      }
    }
  }
  return true
};

// var tree = {
//   val: 5,
//   left: {
//     val: 1
//   },
//   right: {
//     val: 6,
//     left: {
//       val: 4
//     },
//     right: {
//       val: 7
//     }
//   }
// }

// console.log(isValidBST(tree))