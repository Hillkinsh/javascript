var isSymmetric = function(root) {
  if (!root) return true;
  return isMirror(root.left, root.right);
  function isMirror(left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return left.val === right.val && isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }
};

var isSymmetric = function(root) {
  if (!root) return true;
  const stack = [];
  stack.push(root.left);
  stack.push(root.right);
  while(stack.length) {
    const node1 = stack.shift();
    const node2 = stack.shift();
    if (!node1 && !node2) {
      continue;
    } else if (!node1 || !node2) {
      return false;
    } else {
      if (node1.val !== node2.val) {
        return false;
      }
      stack.push(node1.left);
      stack.push(node2.right);
      stack.push(node1.right);
      stack.push(node2.left);
    }
  }
  return true;
}
