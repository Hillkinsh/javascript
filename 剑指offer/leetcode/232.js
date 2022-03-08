
var MyQueue = function() {
  this.stackIn = [];
  this.stackOut = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stackIn.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  let result = null;
  if (this.stackOut.length) {
    result = this.stackOut.pop();
  } else if (this.stackIn.length) {
    while(this.stackIn.length) {
      this.stackOut.push(this.stackIn.pop())
    }
    result = this.stackOut.pop();
  }

  return result;
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  let x = this.pop();
  if (x !== null) {
    this.stackOut.push(x);
  }
  return x;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return !this.stackIn.length && !this.stackOut.length;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

  var obj = new MyQueue()
  obj.push('1')
  obj.push('2')
  obj.push('3')
  obj.push('4')
  console.log('obj:', obj)
  var param_3 = obj.peek()
  console.log('peek:', obj, param_3)
  var param_2 = obj.pop()
  console.log('pop:', obj, param_2)
  obj.push('5')
  console.log('pop:', obj, param_2)
  console.log(obj.pop())
  console.log(obj.pop())
  console.log(obj.pop())
  console.log(obj.pop())


  var param_4 = obj.empty()
  console.log('empty:', obj, param_4)