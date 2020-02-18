var myAtoi = function (str) {
  str = str.trim()
  if (!str) return 0
  let result = ''
  let reg = '0123456789'
  let mark = 1
  if ('+-'.indexOf(str[0]) !== -1) {
    mark = '+-'.indexOf(str[0]) === 0 ? 1 : -1
    str = str.slice(1)
  }
  for (let i = 0; i < str.length; i++) {
    if (reg.indexOf(str[i]) !== -1) {
      result += str[i]
    } else {
      break
    }
  }
  if (!result) return 0
  let bigNum = Math.pow(2, 31)
  if (mark == 1) {
    return result - bigNum + 1 > 0 ? bigNum - 1 : 1 * result
  } else {
    return result - bigNum > 0 ? -bigNum : -1 * result
  }
}
// console.log(myAtoi('42'))
console.log(myAtoi(' -42'))
console.log(myAtoi('4193 with words'))