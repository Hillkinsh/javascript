/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  let result = []
  let arr = []
  if (!root) return result
  arr.push([root, 0])
  while(arr.length) {
    let node =  arr.shift()
    let ele = node[0]
    let depth = node[1]
   
    if (depth >= result.length) result.push([])
    result[depth].push(ele.val)
    if (ele.left) arr.push([ele.left, depth + 1])
    if (ele.right) arr.push([ele.right, depth + 1])
  }
  for (let i = 0; i < result.length; i++) {
    if (i % 2) {
      result[i].reverse()
    }
  }
    
  return result
};

let tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3
    },
    right: {
      val: 4
    }
  },
  right: {
    val: 5,
    left: {
      val: 6
    },
    right: {
      val: 7
    }
  }
}

console.log(zigzagLevelOrder(tree))

// 1

// [2] 
// 2 5
// [2, 5]
// 5 -> 1
// 
// [6 7 2]

// 3 4 6 7