function longestPalindrome(s) {
  let length = s.length
  if (length < 2) return s
  let boolArr = []
  let maxLength = 1
  // 初始化
  for (let i = 0; i < length; i++) {
    if (!boolArr[i]) boolArr[i] = []
  }

  for (let j = 1; j < length; j++) {
    for (let i = 0; i < j; i++) {
      if (s[i] === s[j]) {
        if (j - i < 3) {
          boolArr[i][j] = true
        } else {
          boolArr[i][j] = boolArr[i + 1][j - 1]
        }
      } else {
        boolArr[i][j] = false
      }
      if (boolArr[i][j]) {
        let tempLength = j - i + 1
        if (maxLength < tempLength) {
          maxLength = tempLength
          start = i
        }
      }
    }
  }
  return s.substring(start, start + maxLength)
}

console.log(longestPalindrome("cbbd"))