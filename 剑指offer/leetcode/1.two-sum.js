/*
 * @lc app=leetcode id=1 lang=javascript
 *
 * [1] Two Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const obj = {};
    for (let i = 0; i < nums.length; i++) {
      if (obj[target - nums[i]] !== undefined) {
        return [obj[target - nums[i]], i];
      } else {
        obj[nums[i]] = i;
      }
    }
};
var twoSum = function(nums, target) {
  const obj = {};
  for(let i = 0; i < nums.length; i++) {
    const sub = target - nums[i];
    if (obj[sub] !== undefined) {
      return [obj[sub], i];
    } else {
      obj[nums[i]] = i;
    }
  }
  return [];
}
// @lc code=end

