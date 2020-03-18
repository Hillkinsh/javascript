/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (!nums.length) return 0
  let result = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    let temp = i - 2 >= 0 ? nums[i] + result[i - 2] : nums[i]
    
    result[i] = Math.max(temp, result[i - 1])
  }
  return result[nums.length - 1]
  // 采用 result[i] = nums[i] + result[i-2]
  // 非采用 result[i] = result[i-1]
  // 取一个大值
  // 只有一项，result[0] = nums[0]
  // 2: 
};

// let arr = [1,2,3,1]
// let arr2 = [2,7,9, 3, 1]
// // console.log(rob(arr))

// console.log(rob(arr2))