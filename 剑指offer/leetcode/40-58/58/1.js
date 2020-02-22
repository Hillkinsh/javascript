/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let length = s.length - 1
  let result = 0
  for (let i = length; i >= 0; i--) {
    if (s[i] !== ' ') {
      result++
    } else {
      if (result == 0) {
        continue
      }
      return result
    }
  }
  return result
};
// console.log(lengthOfLastWord("Hello World"))
// console.log(lengthOfLastWord("Hello "))