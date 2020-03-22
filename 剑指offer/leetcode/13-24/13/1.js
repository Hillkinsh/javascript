var romanToInt = function (s) {
  let hash = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
  }
  let result = 0
  let cur
  for (let i = 0; i < s.length; i++) {
    cur = hash[s[i]]
    if (cur < (hash[s[i + 1]] || 0)) {
      result -= cur
    } else {
      result += cur
    }
  }
  return result
};

/**
 * 优化点：1.hash[s[i]]出现多次用一个变量缓存值
 */
console.log(romanToInt('III'))