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
var my2 = function (str) {
  let result = 0;
  let sign = 1;
  let i = 0;
  while(str[i] === " ") {
    i++;
  }
  if (str[i] === "+") {
    sign = 1;
    i++;
  } else if (str[i] === "-") {
    sign = -1;
    i++;
  }
  const obj = {
    0: 1,1: 1,2: 1,3: 1,4: 1,5: 1,6: 1,7: 1,8: 1,9: 1,
  }
  for (; i < str.length; i++) {
    if (obj[str[i]]) {
      result =  result * 10 + Number(str[i]);
    } else {
      break;
    }
  }
  result = result ? sign * result : result;
  const MINUSNUM = -(2 ** 31);
  const MAXNUM = -1 * MINUSNUM - 1;

  if (result > MAXNUM) {
    result = MAXNUM;
  }
  if( result < MINUSNUM) {
    result = MINUSNUM;
  }
  return result;
};
// console.log(myAtoi(' -42'))
// console.log(myAtoi('4193 with words'))
// console.log(my2("-91283472332"))
console.log(my2('12'))
// console.log(my2('-+12'))