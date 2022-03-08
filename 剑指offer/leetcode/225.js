var MyStack = function() {
  this.que1 = [];
  this.que2 = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.que1.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
  let out = this.que1.shift();
    while(this.que1.length) {
      this.que2.push(out);
      out = this.que1.shift();
    }
    let tmp = this.que1;
    this.que1 = this.que2;
    this.que2 = tmp;
    return out;
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
  let x = this.pop();
  if (x !== null) {
    this.que1.push(x);
  }
  
  return x;
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return !this.que1.length && !this.que2.length;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

  var obj = new MyStack()
  obj.push(1)
  obj.push(2)
  // var param_2 = obj.top()
  // console.log('top:', param_2, obj)
  // console.log('top:', obj.top(), obj)
  // console.log('top:', obj.top(), obj)
  var param_3 = obj.pop()
  console.log('pop:', param_3, obj)
  obj.push(3)
  console.log('pop:', obj.pop(), obj)
  console.log('pop:', obj.pop(), obj)
  obj.push(4)
  obj.push(5)
  obj.push(6)
  obj.push(7)

  console.log('pop:', obj.pop(), obj)
  var param_4 = obj.empty()
  console.log('empty:', param_4)
