
  function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/*
* @param {TreeNode} rootE
* @return {number[]}
*/
var inorderTraversal = function(rootE) {
  // 递归
  let result = []
  getListWithLDR(rootE, result)
  return result
};



function getListWithLDR(obj, result) {
  if (!obj) return
  if (obj.left) {
    getListWithLDR(obj.left, result);
  }
  result.push(obj.id)
  if (obj.right) {
    getListWithLDR(obj.right, result);
  }
}

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