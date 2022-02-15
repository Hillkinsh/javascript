// 2分查找
// 输入: nums = [-1,0,3,5,9,12], target = 9
// 输出: 4
// 解释: 9 出现在 nums 中并且下标为 4
// 输入: nums = [-1,0,3,5,9,12], target = 2
// 输出: -1
// 解释: 2 不存在 nums 中因此返回 -1
var search = function(nums, target) {
  let before = 0
  let end = nums.length - 1;
  // return searchD(nums, before, end, target);
  return searchI(nums, target);
};

function searchD(nums, before, end, target) {
  let result = -1;
  if (before > end) {
    return result;
  }
  if (before === end) {
    if (nums[before] === target) {
      return before
    } else {
      return result;
    }
  }
  
  let mid = ((end - before) >> 1) + before;
  if (nums[mid] > target) {
    return searchD(nums, before, mid - 1, target)
  }
  if (nums[mid] === target) {
    return mid;
  }
  if (nums[mid] < target) {
    return searchD(nums, mid + 1, end, target)
  }
}
// iterator
function searchI(nums, target) {
  let before = 0
  let end = nums.length - 1;
  let result = -1;
  while (before <= end) {
    let mid = ((end - before) >> 1) + before;
    if (nums[mid] === target) {
      result = mid;
      break;
    } else if (nums[mid] > target) {
      end = mid - 1;
    } else {
      before = mid + 1;
    }
  }
  return result;
}

// const nums = [-1,0,3,5,9,12], target = 9
const nums  = [-1,0,3,5,9,12], target = 2
console.log(search(nums, target));