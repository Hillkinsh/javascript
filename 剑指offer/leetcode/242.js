/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * 有效的字母异位词
 */
 var isAnagram = function(s, t) {
  const map = {};
  let count = 0;
  for (let c of s) {
    map[c] = (map[c] || 0) + 1;
    count++;
  }
  for (let c of t) {
    if (!map[c]) {
      return false
    }
    map[c]--;
    count--;
  }
  return count === 0
};

let s = '\u597D\u597E\u597F'; // unicode 编码。es6也能支持
let t = '\u597D\u597F\u597E';

console.log(isAnagram(s, t))