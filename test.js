var MinStack = function () {
  this.arr = []
  this.sortArr = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.arr.push(x)
  this.sortArr.push(x)
  this.sortArr.sort((a, b) => a - b)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  let popEle = this.arr.pop()
  let pos = -1
  this.sortArr.some((item, idx) => {
    if (item === popEle) {
      pos = idx
      return true
    }
  })
  this.sortArr.splice(pos, 1)
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.arr[this.arr.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.sortArr[0] || null
};

let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); //--> 返回 -3.
console.log(minStack.pop());
console.log(minStack.top()); //--> 返回 0.
console.log(minStack.getMin()); //--> 返回 -2.