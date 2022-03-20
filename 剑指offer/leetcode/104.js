var maxDepth = function(root) {
  const stack = [];
  if (root) {
    stack.push(root);
  }
  let count = 0;
  while(stack.length) {
    let len = stack.length;
    for (let i = 0; i < len;i++) {
      const node = stack.shift();
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
    }
    count++;
  }
  return count;
};

const root = {
  val:1,
  left: {
    val: 2,
    left: {
      val: 3
    }
  }
}
console.log(maxDepth(root))