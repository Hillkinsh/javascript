
  function TreeNode(val) {
      this.val = val;
      this.left = this.right = null;
  }
/*
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  if (!root) return
  let stack = [];
  stack.push([root, false])
  let out = []
  while(stack.length) {
    let node = stack.pop()
    let nodeEle = node[0]
    let state = node[1]
    if (state) {
      out.push(nodeEle.id)
    } else { // 按照右，中，左的顺序，存了起来。出栈刚好顺序反过来。
      if (nodeEle.right) {
        stack.push([nodeEle.right, false])
      }
      stack.push([nodeEle, true])
      if (nodeEle.left) {
        stack.push([nodeEle.left, false])
      }
    }
  }
  return out;
};

var tree = {
  "id": 0,
  "name": "rootE",
  "left": {
    "id": 1,
    "name": "Simon",
    "left": {
      "id": 3,
      "name": "Carl",
      "left": {
        "id": 7,
        "name": "Lee",
        "left": {
          "id": 11,
          "name": "Fate"
        }
      },
      "right": {
        "id": 8,
        "name": "Annie",
        "left": {
          "id": 12,
          "name": "Saber"
        }
      }
    },
    "right": {
      "id": 4,
      "name": "Tony",
      "left": {
        "id": 9,
        "name": "Candy"
      }
    }
  },
  "right": {
    "id": 2,
    "name": "right",
    "left": {
      "id": 5,
      "name": "Carl",
    },
    "right": {
      "id": 6,
      "name": "Carl",
      "right": {
        "id": 10,
        "name": "Kai"
      }
    }
  }
}

console.log(inorderTraversal(tree))