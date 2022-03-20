// 4
// 2 7
// 1 3 6 9

// 4 
// 7 2
// 9 6 3 1
var invertTree = function(root) {
  const stack = [];
  if (root) {
    stack.push(root);
  }
  while(stack.length) {
    const len = stack.length;
    for (let i = 0; i < len; i++) {
      const node = stack.shift();
      const tmp = node.left;
      node.left = node.right;
      node.right = tmp;
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
    }
  }
  return root;
};