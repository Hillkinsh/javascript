/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// function levelOrder(root) {
//   let result = []
//   pre(root, 0, result)
//   return result
// }

// function pre(root, depth, result) {
//   if (!root) return
//   if (depth >= result.length) {
//     result.push([])
//   }
//   result[depth].push(root.val)
//   pre(root.left, depth + 1, result)
//   pre(root.right, depth + 1, result)
// }

function levelOrder(root) {
  let result = []
  let q = []
  if (root) {
    q.push([root, 0])
  }
  let count = 0
  while (q.length) {
    let node = q.shift()
    root = node[0]
    count = node[1]
    if (count >= result.length) {
      result.push([])
    }
    result[count].push(root.val)
    if (root.left) {
      q.push([root.left, count + 1])
    }
    if (root.right) {
      q.push([root.right, count + 1])
    }
  }
  return result
}