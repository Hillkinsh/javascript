// 反转字符串

var reverseLeftWords = function(s, n) {
  const arr = Array.from(s);
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (i < n) {
      arr[len - n + i] = s[i];
    } else {
      arr[i - n] = s[i];
    }
  }
  return arr.join('');
};

// 不借用额外的字符串s
var reverseLeftWords = function(s, n) {
  const arr = Array.from(s);
  reverse(arr, 0, n - 1);
  reverse(arr, n, arr.length - 1);
  reverse(arr, 0, arr.length - 1);
  return arr.join("")
}
function reverse(arr, begin, end) {
  let tmp;
  while(begin < end) {
    tmp = arr[begin];
    arr[begin++] = arr[end];
    arr[end--] = tmp;
  }
}


var s = "abcdefg", k = 2

// expect "cdefgab"
console.log(reverseLeftWords(s, k))
