/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (!s || s.length == 1) return s.length
  let sub = s[0]
  let pos = 0
  let count = 1
  let result = 0
  let i = 1
  while (i < s.length) {
    if (sub.indexOf(s[i]) == -1) {
      count++
      sub = s.slice(pos, pos + count)
      i++
    } else {
      result = result > count ? result : count
      pos = i - count + 1 + sub.indexOf(s[i])
      sub = s.slice(pos, i)
      count = sub.length
    }
  }
  return result > count ? result : count
}

console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring("dvdf"))
console.log(lengthOfLongestSubstring("ohomm"))

/**
 * 取一个位置作为字串的开始位，
 * 当s[i] 包含在字串中
 *   result 判断count和result最大值
 *   更新pos = i-count + 1 + indexOf(s[i])
 *   更新字串 sub = s.slice(s[pos], i)
 *   更新count = sub.length
 * 返回result和count的最大值
 */