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
 */
var isValidBST = function(root) {
  let prev = null;
  function dfs(root) {
      if (!root) return true
      if (!dfs(root.left))  {
          return false;
      }
      if(prev && prev.val >= root.val) {
          return false;
      } else {
          prev = root;
      }
      return dfs(root.right)
  }

  return dfs(root)
};

var tree = {
  val: 5,
  left: {
    val: 1
  },
  right: {
    val: 6,
    left: {
      val: 4
    },
    right: {
      val: 7
    }
  }
}

console.log(isValidBST(tree))