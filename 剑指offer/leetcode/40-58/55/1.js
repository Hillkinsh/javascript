/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let leftPos = nums.length - 1
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] + i >= leftPos) {
      leftPos = i
    }
  }
  return leftPos == 0;
};
/**
 * 倒着找，位置加位标要大于length-1
 * 满足了leftpos = i 更改判断值为当前位标
 */

// console.log(canJump([2, 3, 1, 1, 4]))