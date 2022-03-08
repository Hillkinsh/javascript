/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * 输入：s = ["h","e","l","l","o"]
   输出：["o","l","l","e","h"]
 */
 var reverseString = function(s) {
  let tmp;
  let aft;
  for (let i = 0; i < (s.length >> 1); i++) {
    aft = s.length - i - 1;
    tmp = s[aft];
    s[aft] = s[i];
    s[i] = tmp;
  }
};

var reverseString = function(s) {
  let i = 0;
  let j = s.length - 1;
  let tmp;
  while(i < j) {
    tmp = s[i];
    s[i++] = s[j];
    s[j--] = tmp;
  }
}
var s = ["h","e","l","l","o"];
reverseString(s);
console.log(s);