var countNodes = function(root) {
  let count = 0;
  const stack = [];
  if (root) {
    stack.push(root);
  }
  while(stack.length) {
    const node = stack.shift();
    count++;
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }
  return count;
};