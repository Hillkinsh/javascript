// 删除有序数组中的重复项目。

// 输入：nums = [0,0,1,1,1,2,2,3,3,4]
/**
 *
 */
// 输出：5, nums = [0,1,2,3,4]

/**
 * @param {number[]} nums
 * @return {number}
 */
 var removeDuplicates = function(nums) {
  if (!nums || !nums.length) {
    return 0;
  }
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
};

var nums = [0,0,1,1,1,2,2,3,3,4]
var removeDuplicates = function (nums) {
  if (!nums || nums.length < 2) return nums && nums.length || 0;
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== nums[j + 1]) {
      nums[i++] = nums[j]
    }
  }
  nums.length = i;
  return i;
}
console.log(removeDuplicates(nums))
console.log(nums);