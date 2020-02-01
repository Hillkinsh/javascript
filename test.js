var countAndSay = function(n) {
  if (n < 1) return 0;
  let result = "1";
  let iter = 1;
  while (iter < n) {
    result = genet(result); // joinStr(splitSame(result))
    iter++;
  }
  return result;

  function genet(str) {
    let temp = 1;
    return str.split("").reduce((sum, cur, curIndex, arr) => {
      if (cur !== arr[curIndex + 1]) {
        sum += temp + cur;
        temp = 1;
      } else {
        temp++;
      }
      return sum;
    }, "");
  }
};

function joinStr(arr) {
  if (!arr.length) return "";
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    result += arr[i].length + arr[i][0];
  }
  return result;
}

function splitSame(str) {
  if (!str) return [];
  let result = [];
  let pre = 0;
  let temp = str[0];
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== temp) {
      result.push(str.slice(pre, i));
      pre = i;
      temp = str[i];
    }
  }
  if (pre < str.length) {
    result.push(str.slice(pre));
  }
  return result;
}
// console.log(countAndSay(0))
// console.log(countAndSay(1))
// console.log(countAndSay(2))
// console.log(countAndSay(3))
// console.log(countAndSay(14))
// console.log(countAndSay(20))
// console.log(countAndSay(50))
// console.log(countAndSay(104))

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0;
  let left = root.left;
  let right = root.right;
  if (left || right) {
    return 1 + Math.max(maxDepth(left), maxDepth(right));
  } else {
    return 1;
  }
};

let tree = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
};

console.log(maxDepth(tree));

// 广度优先搜索
