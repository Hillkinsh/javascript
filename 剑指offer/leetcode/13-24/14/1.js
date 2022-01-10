/**
 * @param {string[]} strs
 * @return {string}, 前缀
 */
var longestCommonPrefix = function (strs) {
  let result = ''
  if (!strs || !strs.length) return result
  result = strs[0]
  for (let i = 1; i < strs.length; i++) {
    while (result) {
      if (strs[i].indexOf(result) === 0) { // 有，继续找
        break
      } else {
        result = result.substring(0, result.length - 1)
      }
    }
    if (!result) {
      break
    }
  }
  return result
}
/**
 * 不是写的好，是人家优化的好。
 * 调用substring比slice效率高很多
 */
var longestCommonPrefix = function (strs) {
  let result = "";
  if (strs && strs.length) {
    let result = strs[0];
    for (let i = 1; i < strs.length; i++) {
      while(result) {
        if (strs[i].indexOf(result) === 0) {
          break;
        } else {
          result = result.substring(0, result.length - 1);
        }
      }
      if (!result) break;
    }
  }
  return result;
}
// console.log(longestCommonPrefix(["flower", "flow", "flight"]))
console.log(longestCommonPrefix2(["flower", "flow", "flight"]))
// console.log(longestCommonPrefix(["c", "acc", "ccc"]))
console.log(longestCommonPrefix2(["c", "acc", "ccc"]))