function longestPalindrome(s) {
  if (!s || s.length === 1) return s
  let result = ''
  let left
  let right
  for (let i = 1; i < s.length; i++) {
    left = i
    right = i
    while (true) {
      if (left > 0 && s[left] == s[left - 1]) {
        left--
      } else if (right < s.length - 1 && s[right] == s[right + 1]) {
        right++
      } else {
        break
      }
    } // 核心位置
    i = right
    // 比较位置
    while (left >= 0 && right < s.length) {
      if (left >= 1 && right < s.length - 1 && s[left - 1] == s[right + 1]) {
        left--
        right++
        continue
      }
      if (right + 1 - left > result.length) {
        result = s.slice(left, right + 1)
      }

      break
    }
  }
  if (right + 1 - left > result.length) {
    result = s.slice(left, right + 1)
  }
  return result
}
// 找到核心区，两头扩。取最大
// 两个优化点：
//1 。for循环从1开始，因为从0开始，里面的while也不执行
// 2. i从最后一个相同的元素开始下一次循环，对abbbbbbbbbc有优化效果

console.log(longestPalindrome('aba'))