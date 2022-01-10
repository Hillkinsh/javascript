function longestPalindrome(s) {
  let len = s.length
  // 字符串长度小于2时无意义。
  if (len < 2) return s

  let dp = []
  // 初始化
  for (let i = 0; i < len; i++) {
    if (!dp[i]) dp[i] = []
    dp[i][i] = true;
  }
  console.log('dp:', dp)
  let maxLen = 1;
  let start = 0;

  for (let j = 1; j < len; j++) {
    for (let i = 0; i < j; i++) {

      if (s[i] == s[j]) {
        if (j - i < 3) { // 长度为 0 1 2 3的情况，两端相等必然是回文
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1]; // 左右两值相等，如果内侧也相等就好了
        }
      } else {
        dp[i][j] = false
      }

      if (dp[i][j]) {
        let curLen = j - i + 1; // 最大的长度，做一个留存
        if (curLen > maxLen) {
          maxLen = curLen;
          start = i;
        }
      }
    }
  }
  return s.substring(start, start + maxLen);
}

console.log(longestPalindrome('babad'))