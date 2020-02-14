var sortColors = function (nums) {
  if (!nums.length) return nums
  let count = [0, 0, 0]
  for (let i = 0; i < nums.length; i++) {
    count[nums[i]]++
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < count.length; j++) {
      if (count[j]) {
        nums[i] = j
        count[j]--
        break
      }
    }
  }
};

let nums = [2, 0, 2, 1, 1, 0]
sortColors(nums)
console.log(nums)