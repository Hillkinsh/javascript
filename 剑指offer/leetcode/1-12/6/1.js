var convert = function (s, numRows) {
  if (numRows == 1) return s
  let result = []
  let period = 2 * numRows - 2
  let pos
  for (let i = 0; i < s.length; i++) {
    pos = i % period
    if (pos < numRows) {
      if (result[pos]) {
        result[pos] = result[pos].concat(s[i])
      } else {
        result[pos] = s[i]
      }
    } else {
      result[period - pos] = result[period - pos].concat(s[i])
    }
  }
  let out = ''
  for (let i = 0; i < result.length; i++) {
    out += result[i]
  }
  return out
}

let s = "LEETCODEISHIRING"
let numRows = 4

console.log(convert(s, numRows))

/**
 * 实现思路：
 * 数组： length < numrows
 * 周期： period < 2 * numrows - 2
 * 优化思想：将子数组编成字符串
 */