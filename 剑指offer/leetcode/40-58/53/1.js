/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let result
  let temp
  for (let i = 0; i < nums.length; i++) {
    if (temp == null) {
      result = temp = nums[i]
    } else {
      temp = temp > 0 ? temp + nums[i] : nums[i]
      result = Math.max(result, temp)
    }
  }
  return result
};

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))