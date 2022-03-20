/**
 * @description: 利用性质，中序的二叉搜素树，是有序序列。
 * @param {TreeNode} root
 * @return {boolean}
 */
 let pre = null;
 var isValidBST = function (root) {
     let pre = null;
     const inOrder = (root) => {
         if (!root) return true;

         let left = inOrder(root.left);

         if (pre !== null && pre.val >= root.val) {
          return false;
         }
         
         pre = root;

         let right = inOrder(root.right);
         return left && right;
     }
     return inOrder(root);
 };
var root = {
  val: 5,
  left: {
    val: 4,
  },
  right: {
    val: 6,
    left: {
      val: 3 // 3大于5，才可以
    },
    right: {
      val: 7
    }
  }
}

console.log(isValidBST(root))