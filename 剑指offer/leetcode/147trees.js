// 树的迭代式写法:

// 中序
var inorderTraversal = function(root, res = []) {
  const stack = [];
  if (root) stack.push(root);
  while(stack.length) {
      const node = stack.pop();
      if(!node) {
          res.push(stack.pop().val);
          continue;
      }
      if (node.right) stack.push(node.right); // 右
      stack.push(node); // 中
      stack.push(null);
      if (node.left) stack.push(node.left); // 左
  };
  return res;
};

var preorderTraversal = function(root, res = []) {
  var stack = [];
  if (root) {
    stack.push(root);
  }
  while(stack.length) {
    var node = stack.pop();
    if (!node) {
      res.push(stack.pop().val);
      continue;
    } else {
      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
      stack.push(node);
      stack.push(null);
    }
  }
  return res;
};

var postorderTraversal = function(root, res = []) {
  const stack = [];
  if (root) {
    stack.push(root);
  }
  while(stack.length) {
    const node = stack.pop();
    if (!node) {
      res.push(stack.pop().val);
    } else {
      stack.push(node);
      stack.push(null);
      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
    }
  }
  return res;
};
