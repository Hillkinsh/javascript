var isBalanced = function(root) {
  return getHeight(root) === -1;
  function getHeight(root) {
    if (!root) return 0;
    let leftHeight = getHeight(root.left);
    if (leftHeight === -1) return -1;
    let rightHeight = getHeight(root.right);
    if (rightHeight === -1) return -1;
    return Math.abs(leftHeight - rightHeight) > 1 ? -1 : 1 + Math.max(leftHeight, rightHeight);
  }
};