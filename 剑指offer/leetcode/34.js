/**
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

进阶：

你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  let left = search(nums, target, "LEFT");
  let right = -1;
  if (left !== -1) {
    right = search(nums, target, "RIGHT");
  }
  return [left, right];
};

function search(nums, target, type) {

  type = type || "LEFT";
  let result = -1;
  let i = 0;
  let j = nums.length - 1;
  while (i <= j) {
    let k = i + ((j - i) >> 1)
    if (nums[k] === target) {
      result = k;
      if (type === "LEFT") {
        j = k - 1;
      } else {
        i = k + 1;
      }
    } else if (nums[k] > target) {
      j = k - 1;
    } else if (nums[k] < target) {
      i = k + 1;
    }
  }
  return result;
}
function searchR(nums, target) {
  let result = -1;
  let i = 0;
  let j = nums.length - 1;
  while (i <= j) {
    let k = i + ((j - i) >> 1)
    if (nums[k] === target) {
      result = k;
      i = k + 1;
    } else if (nums[k] > target) {
      j = k - 1;
    } else if (nums[k] < target) {
      i = k + 1;
    }
  }
  return result;
}

// const nums = [-1,0,3,5,9,12], target = 9
// const nums  = [5,7,7,8,8,10], target = 6
// const nums = [1,3,5,6], target = 5
// const nums = [1,3,5,6], target = 7
// const nums = [1,3,5,6], target = 0
// const nums = [1], target = 0
const nums = [], target = 0
console.log(searchRange(nums, target));
