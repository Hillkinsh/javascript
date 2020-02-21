/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (!needle) return 0
  let flag
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    flag = true
    if (needle[0] === haystack[i]) {
      for (let j = 1; j < needle.length; j++) {
        if (needle[j] !== haystack[i + j]) {
          flag = false
          break
        }
      }
      if (flag) {
        return i
      }
    }
  }
  return -1
};

/**
 * 这种直接mn复杂度的对比，为啥这么慢
 */
console.log(strStr('hello', 'o'))