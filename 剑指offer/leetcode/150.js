/**
 * @param {string[]} tokens
 * @return {number}
 * 有效的算符包括 +、-、*、/ 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

注意 两个整数之间的除法只保留整数部分。
 */
 var evalRPN = function(tokens) {
  const operationObj = {
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      let value = a / b;
      if (value < 0) {
        return Math.ceil(value);
      } else {
       return  Math.floor(value);
      }
    },
  }
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    let matchFn = operationObj[tokens[i]];
    console.log(stack)
    if (matchFn) {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(matchFn(left, right));
    } else {
      stack.push(tokens[i]);
    }
  }
  return stack.pop();
};

var tokens = ["2","1","+","3","*"];
var tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"];
var tokens = ["4","13","5","/","+"];
console.log(evalRPN(tokens));