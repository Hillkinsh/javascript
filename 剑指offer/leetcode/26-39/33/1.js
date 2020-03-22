var search = function (nums, target) {
  if (!nums.length) return -1
  return binarySearch(nums, 0, nums.length - 1, target)
}

function binarySearch(nums, start, end, target) {
  // console.log(start, end)
  if (end <= start) {
    return nums[start] === target ? start : -1
  }
  if (end - start === 1) {
    if (nums[end] === target) return end
    return nums[start] === target ? start : -1
  }
  let mid = Math.floor((start + end) / 2)
  // 左侧有序，且值在左侧范围，右侧且值不在右侧范围
  if (nums[mid] === target) return mid

  let type1 = nums[start] <= nums[mid - 1] &&
    (target >= nums[start]) &&
    (target <= nums[mid - 1])
  let type2 = nums[mid + 1] <= nums[end] &&
    (target < nums[mid + 1] || target > nums[end])
  if (type1 || type2) {
    return binarySearch(nums, start, mid - 1, target)
  } else {
    return binarySearch(nums, mid + 1, end, target)
  }
}
let nums = [4, 5, 6, 7, 0, 1, 2],
  target = 0
console.log(search(nums, target))