/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  return binarySearch(nums, 0, nums.length - 1, target)
};

function binarySearch(nums, start, end, target) {
  if (end <= start) {
    return nums[start] >= target ? start : start + 1
  }
  let mid = Math.floor((start + end) / 2)
  // console.log(start, mid, end)
  if (target <= nums[mid]) {
    return binarySearch(nums, start, mid, target)
  } else {
    return binarySearch(nums, mid + 1, end, target)
  }
}

for (let i = 0; i < 7; i++) {
  console.log(searchInsert([1, 3, 5, 6], i))
}
/**
 * 0 0
 * 1 0
 * 2 1
 * 3 1
 * 4 2
 * 5 2
 * 6 3
 */
// console.log(searchInsert([1, 3, 5, 6], 4))