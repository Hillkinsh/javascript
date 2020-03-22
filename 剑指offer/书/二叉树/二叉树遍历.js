// 前序遍历，中序遍历，后序遍历的定义
// 中左右，左中右，左右中

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

// 递归版本

// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR(obj) {
  console.log(obj.id);
  if(obj.left){
    getListWithDLR(obj.left);
  }
  if(obj.right){
    getListWithDLR(obj.right);
  }
}
// console.log("前序遍历：");
// getListWithDLR(tree);
// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR(obj) {
  if(obj.left){
    getListWithLDR(obj.left);
  }
  console.log(obj.id);
  if(obj.right){
    getListWithLDR(obj.right);
  } 
}
// console.log("中序遍历：");
// getListWithLDR(tree);

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD(obj) {
  if(obj.left){
    getListWithLRD(obj.left);
  }
  if(obj.right){
    getListWithLRD(obj.right);
  } 
  console.log(obj.id);
}
// console.log("后序遍历：");
// getListWithLRD(tree);

// 非递归打印二叉树
//

function prev (root) {
  let arr = [],
      node = null;

  arr.unshift(root);

  while (arr.length !== 0) {
    node = arr.shift();
    console.log(node.data);

    if (node.right !== null) {
      arr.unshift(node.right);
    }

    if (node.left !== null) {
      arr.unshift(node.left);
    }
  }
}
function middle (root) {
  let arr = [],
  node = root;

while (arr.length !== 0 || node !== null) {
  if (node === null) {
    node = arr.shift();
    console.log(node.data);
    node = node.right;
  } else {
    arr.unshift(node);
    node = node.left;
  }
}
}

function prevI (root) {
  if (!root) {
    throw new Error('数据格式错误')
  }
  let arr = []
  arr.unshift(root)
  while (arr.length) {
    let node = arr.shift()
    console.log(node.id)
    if (node.right) {
      arr.unshift(node.right)
    }
    if (node.left) {
      arr.unshift(node.left)
    }
  }
}

prevI(tree)

function recurTreePre(root) {
  if (!root) throw new Error('传参格式错误')
  console.log(root.id)
  root.left && recurTreePre(root.left)
  root.right && recurTreePre(root.right)
}
recurTreePre(tree)