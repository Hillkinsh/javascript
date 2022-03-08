/**
 * 输入：n = 19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。

 * @param {number} n
 * @return {boolean}
 */
 var isHappy = function(n) {
   if (n === 1) return true;
   const map = {};
  let res = n;
  while(res !== 1) {
    let str = String(res);
    res = 0;
    for (let i = 0; i < str.length; i++) {
      res += str[i] * str[i];
    }
    if (map[res]) {
      return false;
    } else {
      map[res] = 1;
    }
  }
  return true;
};

// 不用数据类型转换怎么写

var isHappy = function(n) {
  if (n === 1) return true;
  const map = {};
  let res = n;
  while(res !== 1) {
    res = getN(res);
    if (map[res]) {
      return false;
    } else {
      map[res] = 1;
    }
  }
  return true;
};

function getN(n) {
  let sum = 0;
  while (n) {
    let mul = n % 10;
    n = Math.floor(n / 10);
    sum += mul * mul;
  }
  return sum;
}

console.log(getN(19))

console.log(isHappy(19))