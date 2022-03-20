var minDepth = function(root) {
  const stack = [];
  let count = 0;
  if (root) {
    stack.push(root);
  }
  while(stack.length) {
    let len = stack.length;
    for (let i = 0; i < len; i++) {
      const node = stack.shift();
      if (!node.left && !node.right) {
        return count + 1;
      }
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
    }
    count++;
  }
};