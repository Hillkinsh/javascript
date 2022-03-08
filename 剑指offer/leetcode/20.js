/**
 * @param {string} s
 * @return {boolean}
 */
 var isValid = function(s) {
  const arr = [];
  const obj = {
    "}": "{",
    ")": "(",
    "]": "["
  };
  const pushObj = {
    "{": 1,
    "(": 1,
    "[": 1
  };
  let result = true;
  for (let i = 0; i < s.length; i++) {
    if (pushObj[s[i]]) {
      arr.push(s[i]);
    } else {
      if (arr[arr.length - 1] === obj[s[i]]) {
        arr.pop();
      } else {
        result = false;
        break;
      }
    }
  }
  return result && arr.length === 0;
};

// 输入：s = "([)]"
// 输出：false
// 示例 5：

// 输入：s = "{[]}"
// 输出：true
var s = "([)]"
// var s = "{[]}";
console.log(isValid(s))