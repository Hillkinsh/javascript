// 输入：s = "ab#c", t = "ad#c"
// 输出：true
// 解释：s 和 t 都会变成 "ac"。
// 示例 2：

// 输入：s = "ab##", t = "c#d#"
// 输出：true
// 解释：s 和 t 都会变成 ""。
// 示例 3：

// 输入：s = "a#c", t = "b"
// 输出：false
// 解释：s 会变成 "c"，但 t 仍然是 "b"。


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
  let arrS = trans(Array.from(s))
  let arrT = trans(Array.from(t))
  return arrS.join('') === arrT.join('');
};
function trans(arr) {
  let i = 0;
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === "#") {
      i = i > 0 ? i - 1 : 0;
    } else {
      arr[i++] = arr[j];
    }
  }
  
  arr.length = i;
  return arr;
}

var s = "ab#c", t = "ad#c";
// var s = "ab##", t = "c#d#";
// var s = "a#c", t = "b";
var s = "a##c", t = "#a#c";
trans(Array.from(t))
console.log(backspaceCompare(s, t))