// 前序遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var preorderTraversal = function(root) {
  const result = [];
  preorder(root, result);
  return result;
  function preorder(root, arr) {
    if (root) {
      arr.push(root.value);
      root.left && preorder(root.left, arr);
      root.right && preorder(root.right, arr);
    }
  }
};

// 非递归
var preorderTraversal = function(root) {
  const arr = [root];
  const result = [];
  while(arr.length) {
    const ele = arr.pop();
    if (ele) {
      result.push(ele.val);
      ele.right && arr.push(ele.right);
      ele.left && arr.push(ele.left);
    }
  }
  return result;
};
const tree = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null
  }
}
console.log(preorderTraversal(tree))