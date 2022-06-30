/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * 递归，如果当前已有3个不一样，则将当前位置和前面三个比较，算出来新的结果和下标；
 */
var lengthOfLongestSubstring = function(s) {
    if (!s || s.length === 1) return s.length;
    function recur (s, current, prev, max) {
      // 如果已到最后，则终止；
      max = Math.max(max, current - prev);
      if (current >= s.length) {
        return max;
      } else {
        for (let i = prev; i < current; i++) {
          if (s[i] === s[current]) {
            prev = i + 1;
          }
        }
      }
      current++;
      return recur(s, current, prev, max)
    }
    return recur(s, 1, 0, 1);
};

// s = "abcabcbb"
var lengthOfLongestSubstring = function(s) {
  let pre = 0;
  
  if (s.length < 2) return s.length;
  let max = 1;
  for (let i = 1; i < s.length; i++) {
    const index = indexOfStr(s, s[i], i, pre);
    console.log(index,i, ":index")
    if (index !== -1) {
      pre = index + 1;
    } else {
      max = Math.max(i - pre + 1, max);
    }
  }
  return max;
};
function indexOfStr(s, ele, i, pre) {
  let result = -1;
  for (let j = pre; j < i; j++) {
    if (s[j] === ele) {
      result = j;
      break;
    }
  }
  return result;
}

var s = "bbbbb";
console.log(lengthOfLongestSubstring(s))
