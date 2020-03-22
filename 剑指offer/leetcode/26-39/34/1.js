var searchRange = function (nums, target) {
  let pos = binarySearch(nums, 0, nums.length - 1, target)
  if (pos !== -1) {
    let start = pos
    let end = pos
    while (start - 1 >= 0 && nums[start - 1] === target) {
      start--
    }
    while (end + 1 < nums.length && nums[end + 1] === target) {
      end++
    }
    return [start, end]
  } else {
    return [-1, -1]
  }
};

function binarySearch(nums, left, right, target) {
  if (right <= left) {
    return nums[left] === target ? left : -1
  }
  if (right - left === 1) {
    if (nums[right] === target) return right
    return nums[left] === target ? left : -1
  }
  let mid = Math.floor((left + right) / 2)
  if (nums[mid] === target) return mid
  if (nums[left] <= target && nums[mid - 1] >= target) {
    return binarySearch(nums, left, mid - 1, target)
  } else {
    return binarySearch(nums, mid, right, target)
  }
}

let nums = [5, 7, 7, 8, 8, 10],
  target = 8

console.log(searchRange(nums, target))