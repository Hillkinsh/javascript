/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSumClosest = function (nums, target) {
  let res = ''
  let length = nums.length;
  nums.sort((a, b) => a - b) // 先排个队，最左边是最弱（小）的，最右边是最强(大)的
  let first
  let last
  let result
  let closeValue = Math.pow(2, 31) - 1
  for (let i = 0; i < length - 2;) {
    first = i + 1
    last = length - 1
    do {
      result = nums[i] + nums[first] + nums[last]
      // console.log('i:', nums[i], 'first:', nums[first], 'last:', nums[last], result, target, result - target)
      if (Math.abs(result - target) < Math.abs(closeValue)) {
        res = result
        closeValue = result - target
      }
      if (result - target > 0) {
        while (first < last && nums[last] === nums[--last]) {} // 如果相等就跳过
      } else {
        while (first < last && nums[first] === nums[++first]) {} // 如果相等就跳过
      }

    } while (first < last)
    while (nums[i] === nums[++i]) {}
  }
  return res
}

// console.log(threeSumClosest([1, 1, 1, 1], 0))
// console.log(threeSumClosest([-1, 2, 1, -4], 1))
// console.log(threeSumClosest([1, 1, -1, -1, 3], 3))
console.log(threeSumClosest([1, 1, -1, -1, 3], -1))

// [1,1,-1,-1,3]
// 3
// -4 -1 1 2