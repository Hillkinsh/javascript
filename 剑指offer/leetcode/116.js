/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
 var connect = function(root) {
    const stack = [];
    if (root) {
      stack.push(root);
    }
    while(stack.length) {
      let tmp;
      let len = stack.length;
      for (let i = 0; i < len; i++) {
        const node = stack.shift();
        if (i === 0) {
          tmp = node
        } else {
          if (tmp) {
            tmp.next = node;
          }
          tmp = node;
        }
        node.left && stack.push(node.left);
        node.right && stack.push(node.right);
      }
    }
    return root;
};

var root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4
    },
    right: {
      val: 5
    }
  },
  right: {
    val: 3,
    left: {
      val: 6
    },
    right: {
      val: 7
    }
  }
}
connect(root)
console.log(root)