// 非递归

function levelOrder(root) {
  let result = []
  let data
  if (root) {
    data = [[root, 0]]
  }
  while(data && data.length) {
    let elearr = data.shift()
    let tree = elearr[0]
    let depth = elearr[1]

    if (depth >= result.length) {
      result.push([])
    }
    result[depth].push(tree.val)
    if (tree.left) data.push([tree.left, depth + 1])
    if (tree.right) data.push([tree.right, depth + 1])
  }
  return result
}