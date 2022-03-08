/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function getBig(nums, i, k) {
  let result = nums[i];
  for (let j = i + 1; j < i + k; j++) {
    result = result > nums[j] ? result : nums[j];
  }
  return result;
}
class MyQue {
  constructor() {
    this.queue = [];
  }
  enqueue(value) {
      let back = this.queue[this.queue.length - 1];
      while (back !== undefined && back < value) {
          this.queue.pop();
          back = this.queue[this.queue.length - 1];
      }
      this.queue.push(value);
  }
  dequeue(value) {
      let front = this.front();
      if (front === value) {
          this.queue.shift();
      }
  }
  front() {
      return this.queue[0];
  }
}
 var maxSlidingWindow = function(nums, k) {

  let helperQueue = new MyQue();
    let i = 0, j = 0;
    let resArr = [];
    while (j < k) {
        helperQueue.enqueue(nums[j++]);
    }
    resArr.push(helperQueue.front());
    while (j < nums.length) {
        helperQueue.enqueue(nums[j]);
        helperQueue.dequeue(nums[i]);
        resArr.push(helperQueue.front());
        i++, j++;
    }
    return resArr;
};

var nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]
// {2, 3, 5, 1 ,4}

console.log(maxSlidingWindow(nums, k));