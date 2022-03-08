/**
 * @param {string} s
 * @return {string}
 */
 
var removeDuplicates = function(s) {
  let mark = true;
  while(mark) {
    for (let i = 0; i < s.length - 1; i++) {
      if (s[i] === s[i + 1]) {
        s = s.substring(0, i).concat(s.substring(i + 2));
        break;
      } else {
        if (i === s.length - 2) {
          mark = false;
        }
      }
    }
  }
  return s;
};
var removeDuplicates = function(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (!stack.length) {
      stack.push(s[i]);
    } else {
      const topEle = stack[stack.length - 1];
      if (topEle === s[i]) {
        stack.pop();
      } else {
        stack.push(s[i]);
      }
    }
  }
  return stack.join('');
}

var s = 'abbaca';
console.log(removeDuplicates(s));