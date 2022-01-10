/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) return false
  if (x >= 0 && x <= 9) return true
  let arr = []
  while (x > 0) {
    arr.push(x % 10)
    x = ~~(x / 10)
  }
  for (let i = 0; i < ~~(arr.length / 2); i++) {
    if (arr[i] != arr[arr.length - 1 - i]) {
      return false
    }
  }
  return true
};

/**
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome2 = function(x) {
  let digit = 0;
  let bak = x;
  while(bak > 0) {
    digit = digit * 10 + bak % 10;
    bak = ~~(bak / 10);
  }
  return digit === x;
};
console.log(isPalindrome2(121));