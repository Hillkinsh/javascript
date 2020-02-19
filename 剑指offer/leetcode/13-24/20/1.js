/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (!s) return true
  let pushMap = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  let popMap = {
    ')': '(',
    ']': '[',
    '}': '{'
  }
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (pushMap[s[i]] !== undefined) {
      stack.push(s[i])
    } else {
      if (popMap[s[i]] !== stack.pop()) {
        return false
      }
    }
  }
  return stack.length == 0
};
let str = '()[]{}'

console.log(isValid(str))
console.log(isValid('(]'))
console.log(isValid('([)]'))
console.log(isValid('{[]}'))