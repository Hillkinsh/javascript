var connect = function (root) {
  let queue = [];
  if (root) {
    queue.push(root);
  }
  while (queue.length !== 0) {
    let level = [];
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let currentNode = queue.shift();
      level.push(currentNode);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
    for (let j = 0; j < level.length; j++) {
      level[j].next = level[j + 1];
    }
  }
  return root;
};

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
console.log(connect(tree))