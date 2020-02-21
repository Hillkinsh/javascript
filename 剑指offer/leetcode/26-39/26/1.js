/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (!nums.length || nums.length === 1) {
    return nums.length
  }
  let i = nums.length - 1
  let temp
  while (i >= 0) {
    temp = i - 1
    if (i - 1 >= 0 && nums[i] == nums[i - 1]) { // 当前值和前一值相同，覆盖前一值。length--
      for (j = i; j < nums.length; j++) {
        nums[temp] = nums[j]
        temp++
      }
      nums.length--
    } else {
      i--
    }
  }
  // console.log(nums)
  return nums.length
};
/**
 * 这个思路的问题是有大量的元素移动操作，不可取，好的思路是取出不同元素望前放
 */

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4]))