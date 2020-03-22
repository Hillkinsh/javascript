/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let length = nums.length
  let result = []
  let route = []
  let backtrack = (route) => {
    if (route.length === length) {
      result.push(route)
      return
    }
    for (let i = 0; i < length; i++) {
      if (route.includes(nums[i])) continue
      route.push(nums[i])
      backtrack(route.slice())
      route.pop()
    }
  }
  backtrack(route)
  return result
};

// console.log(permute([1, 2, 3]))