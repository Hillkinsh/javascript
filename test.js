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