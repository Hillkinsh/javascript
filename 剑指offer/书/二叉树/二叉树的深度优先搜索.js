function DepthFirstTravel(root) {
  let s = []
  let result = []
  if (!root) return []
  s.push(root)
  while (s.length) {
    root = s.pop()
    result.push(root.val)
    if (root.right) {
      s.push(root.right)
    }
    if (root.left) {
      s.push(root.left)
    }
  }
  return result
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function _buildTree(ll, lr, rl, rr, inorder, postorder) {
  if (ll > lr || rl > rr) return null
  let len = 0
  for (let i = ll; i <= lr; i++) { // 这个遍历为了从中序中取到跟节点相对位置而非下标
    if (inorder[i] == postorder[rr]) break
    len++
  }
  // console.log(inorder.indexOf(postorder[rr]), len)
  let root = new TreeNode(postorder[rr])
  root.left = _buildTree(
    ll, ll + len - 1,
    rl, rl + len - 1,
    inorder, postorder
  )
  root.right = _buildTree(
    ll + len + 1, lr,
    rl + len, rr - 1,
    inorder, postorder
  )
  return root
}

function buildTree(inorder, postorder) {
  return _buildTree(0, inorder.length - 1, 0, postorder.length - 1, inorder, postorder);
}


var tree = {
  "val": 0,
  "name": "root",
  "left": {
    "val": 1,
    "name": "Simon",
    "left": {
      "val": 3,
      "name": "Carl",
      "left": {
        "val": 7,
        "name": "Lee",
        "left": {
          "val": 11,
          "name": "Fate"
        }
      },
      "right": {
        "val": 8,
        "name": "Annie",
        "left": {
          "val": 12,
          "name": "Saber"
        }
      }
    },
    "right": {
      "val": 4,
      "name": "Tony",
      "left": {
        "val": 9,
        "name": "Candy"
      }
    }
  },
  "right": {
    "val": 2,
    "name": "right",
    "left": {
      "val": 5,
      "name": "Carl",
    },
    "right": {
      "val": 6,
      "name": "Carl",
      "right": {
        "val": 10,
        "name": "Kai"
      }
    }
  }
}
console.log(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]))