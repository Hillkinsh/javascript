function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function getTree(begin, end) {
  let res = []
  if (begin > end) {
    res.push(null);
    return res;
  }
  for (let i = begin; i <= end; i++) {
    let leftNode = getTree(begin, i - 1);
    let rightNode = getTree(i + 1, end);
    for (left in leftNode) {
      for (right in rightNode) {
        let root = new TreeNode(i);
        root.left = leftNode[left];
        root.right = rightNode[right];
        res.push(root);
      }
    }
  }
  return res;
}

function generateTrees(n) {
  if (n == 0) {
    return []
  }
  return getTree(1, n);
}

// console.log(generateTrees(3))