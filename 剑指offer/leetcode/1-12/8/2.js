// 状态机写法
/**
 * 
 .table = {
        'start': ['start', 'signed', 'in_number', 'end'],
        'signed': ['end', 'end', 'in_number', 'end'],
        'in_number': ['end', 'end', 'in_number', 'end'],
        'end': ['end', 'end', 'end', 'end'],
    }

 */
var myAtoi = function (str) {
  const table = {
    'start': ['start', 'signed', 'in_number', 'end'],
    'signed': ['end', 'end', 'in_number', 'end'],
    'in_number': ['end', 'end', 'in_number', 'end'],
    'end': ['end', 'end', 'end', 'end'],
  }
  let state = "start";
  let sign = 1;
  
  const getState = function (str) {
    const digit = {
      0: 1,1: 1,2: 1,3: 1,4: 1,5: 1,6: 1,7: 1,8: 1,9: 1,
    }
    if (str === " ") {
      return 0;
    } else if (str === "+" || str === "-") {
      return 1;
    } else if (digit[str]) {
      return 2;
    } else {
      return 3;
    }
  };
  
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    state = table[state][getState(str[i])];
    if (state === "signed") {
      sign = str[i] === "-" ? -1 : 1;
    } else if (state === "in_number") {
      result = result * 10 + Number(str[i]);
    } else if (state === "end") {
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
}

console.log(myAtoi(' -42'))
console.log(myAtoi('4193 with words'))
console.log(myAtoi("-91283472332"))
console.log(myAtoi('12'))
console.log(myAtoi('-+12'))