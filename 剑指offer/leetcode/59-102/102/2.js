// 递归

function levelOrder(root) {
  let result = []
  pre(root, 0, result)
  return result
}

function pre (root, depth, result) {
  if (!root) return
  if (depth >= result.length) {
    result.push([])
  }
  result[depth].push(root.val)
  pre(root.left, depth+1, result)
  pre(root.right, depth+1, result)
}