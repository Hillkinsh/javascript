var levelOrder = function(root) {
  let curLevel = 0;
  let res = [];
  let stack = [];
  if (root) {
    stack.push(root);
  }
  while(stack.length) {
    let len = stack.length;
    res[curLevel] = [];
    for (let i = 0; i < len; i++) {
      const node = stack.shift();
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
      res[curLevel].push(node.val);
    }
    curLevel++;
  }
  return res;
};