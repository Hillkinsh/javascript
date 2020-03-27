/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function getTree(begin, end) {
  let res = []
  if (begin > end) {
    res.push(null)
    return res
  }
  for (let i = begin; i <= end; i++) {
    let lC = getTree(begin, i - 1)
    let rC = getTree(i + 1, end)
    for (left of lC) {
      for (right of rC) {
        let root = new TreeNode(i)
        root.left = left
        root.right = right
        res.push(root)
      }
    }
  }
  return res
}

function generateTrees(n) {
  if (n == 0) {
    return []
  }
  return getTree(1, n);
}

// console.log(generateTrees(3))