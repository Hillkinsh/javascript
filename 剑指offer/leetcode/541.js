// 给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。

// 如果剩余字符少于 k 个，则将剩余字符全部反转。
// 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
//  

// 示例 1：

// 输入：s = "abcdefg", k = 2
// 输出："bacdfeg"
// 示例 2：

// 输入：s = "abcd", k = 2
// 输出："bacd"

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
  let arr = s.split("");
  for (let i = 0; i < arr.length; i += 2 * k) {
    let prev = i - 1;
    let aft = i + k > arr.length ? arr.length : i + k;
    while(++prev < --aft) {
      [arr[prev], arr[aft]] = [arr[aft], arr[prev]];
    }
  }
  return arr.join('');
};

var s = "abcdefg", k = 2;

console.log(reverseStr(s, k))


