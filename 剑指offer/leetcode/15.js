/**
 * @param {number[]} nums
 * @return {number[][]}
 * 输入：nums = [-1,0,1,2,-1,-4]
   输出：[[-1,-1,2],[-1,0,1]]

   三数之和为 0
 */
 var threeSum = function(nums) {
  nums.sort((a, b) => a - b);
  const result = []; 
  const length = nums.length;
  let i = 0;
  if (nums[i] <= 0 && nums[length - 1] >= 0) {
    while (i < length - 2) {
      if (nums[i] > 0) break;
      let first = i + 1;
      let last = length - 1;
      while(first < last) {
        if (nums[i] * nums[last] > 0) break;
        let sum = nums[i] + nums[first] + nums[last];
        if (sum === 0) {
          result.push([nums[i], nums[first], nums[last]]);
        }
        if (sum <= 0) {
          while(first < last && nums[first] === nums[++first]) {}
        } else {
          while(first < last && nums[last] === nums[--last]) {}
        }
      }
      while (nums[i] === nums[++i]) {}
    }
  }
  return result;
};

var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  let len = nums.length;
  let i = 0;
  while(i < len - 2) {
    let pre = i + 1;
    let aft = len - 1;
    while(pre < aft) {
      
      const sum = nums[i] + nums[pre] + nums[aft];
      console.log(sum, ":sum", i, pre, aft)
      if (sum === 0) {
        result.push([nums[i], nums[pre], nums[aft]]);
      }
      if (sum <= 0) {
        while(pre < aft && nums[pre] === nums[++pre]) {}
      } else {
        while(pre < aft && nums[aft] === nums[--aft]) {}
      }
    }
    while(i < len - 2 && nums[i] === nums[++i]) {}
  }
  return result;
}
var nums = [-1,0,1,2,-1,-1,-4];

console.log(threeSum(nums))

/**
 * 关键在2个。一个是基本实现，双指针法。
 * 一个是去重复，
 */