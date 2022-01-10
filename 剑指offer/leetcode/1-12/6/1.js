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
const convert2 = function (s, numRows) {
  let result = "";
  if (numRows < 2) return s;
  const period = 2 * numRows - 2;
  const arr = [];
  for (let i = 0; i < s.length; i++) {
    let pos = i % period;
    if (pos < numRows) {
      arr[pos] ? arr[pos].push(s[i]) : arr[pos] = [s[i]];
    } else {
      arr[period - pos].push(s[i]);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    result += arr[i].join("");
  }
  return result;
}

let s = "LEETCODEISHIRING"
let numRows = 4

console.log(convert2(s, numRows))
console.log(convert2("A", 1))

/**
 * 实现思路：
 * 数组： length < numrows
 * 周期： period < 2 * numrows - 2
 * 优化思想：将子数组编成字符串
 */