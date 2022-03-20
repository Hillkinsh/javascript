var postorderTraversal = function(root) {
  var result = [];
  postorder(root, result);
  return result;
  function postorder(root, result) {
    if(root) {
      root.left && postorder(root.left, result);
      root.right && postorder(root.right, result);
      result.push(root.val);
    }
  }
};