/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (!nums.length || nums.length === 1) {
    return nums.length
  }
  let pos = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[pos]) {
      nums[++pos] = nums[i]
    }
  }
  return pos + 1
};
/**
 * 这个思路的问题是有大量的元素移动操作，不可取，好的思路是取出不同元素望前放
 */

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4]))