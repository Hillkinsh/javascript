function maxSubArray(nums) {
  let n = nums.length
  let max_sum = nums[0]
  for (let i = 0; i < n; i++) {
    if (nums[i - 1] > 0) {
      nums[i] += nums[i - 1]
    }
    max_sum = Math.max(nums[i], max_sum)
  }
  return max_sum
}

console.log(dp([-2, 1, -3, 4, -1, 2, 1, -5, 4], 8))

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))