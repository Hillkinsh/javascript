var tree = {
  "id": 0,
  "name": "root",
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
function COUNT_tree(root, depth, k) {
  if (!root )
      return 0;
  if (depth == k) {
    COUNT_tree.number++;
  }
  COUNT_tree(root.left, depth + 1, k);
  COUNT_tree(root.right, depth + 1, k);
}
COUNT_tree.number = 0
COUNT_tree(tree, 0, 2, 0 )
console.log(COUNT_tree.number)

function count_iter (root, depth) {
  if (!root) return 0
  let number = 0
  let iter = 0
  let arr = [root]
  let target = []

  while (true) {
    if (iter == depth) {
      return arr.length
    }
    target = []
    for (let i=0; i<arr.length;i++) {
      let node = arr[i]
      node.left && target.push(node.left)
      node.right && target.push(node.right)
    }
    if (target.length) {
        let temp
        temp = target
        target = arr
        arr = temp
        iter++
    } else {
      return 0
    }
  }
}

console.log(count_iter(tree, 2))


