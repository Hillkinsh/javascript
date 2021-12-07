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


function indexOfIt(s, start, end, ele) {
  for (let i = start; i < end; i++) {
    if (s[i] === ele) {
      return i;
    }
  }
  return -1;
}
var lengthOfLongestSubstringV2 = function(s) {
    if (!s) return 0;
    let prev = 0;
    let next = 1;
    let count = 1;
    let result = 0;
    while(next < s.length) {
      let pos = indexOfIt(s, prev, next, s[next]);
      if (pos === -1) {
        count++;
      } else {
        result = result > count ? result : count;
        prev = pos + 1;
        count = next - prev + 1;
      }
      next++;
    }
    return result > count ? result : count;
};

console.log(lengthOfLongestSubstringV2('abcabcbb'))
console.log(lengthOfLongestSubstringV2("dvdf"))
console.log(lengthOfLongestSubstringV2("ohomm"))

'abcabcbb'
/**
 * 取一个位置作为字串的开始位，
 * 当s[i] 包含在字串中
 *   result 判断count和result最大值
 *   更新pos = i-count + 1 + indexOf(s[i])
 *   更新字串 sub = s.slice(s[pos], i)
 *   更新count = sub.length
 * 返回result和count的最大值
 */