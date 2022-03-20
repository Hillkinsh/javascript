/**
 * @param {TreeNode} root
 * @return {string[]}
 */
 var binaryTreePaths = function(root) {
  let result = [];
  if (!root) {
    return result;
  }
  getPath(root, "");
  return result;
  function getPath(root, currentPath) {
    if (root) {
      currentPath = currentPath ? currentPath + `->${root.val}` : root.val;
      if (!root.left && !root.right) {
        result.push(currentPath);
      } else {
        root.left && getPath(root.left, currentPath);
        root.right && getPath(root.right, currentPath);
      }
    }
  }
};