/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
  if (nums.length <= 1) return
  let i = nums.length - 2
  let j = nums.length - 1
  let k = nums.length - 1

  while (i >= 0 && nums[i] >= nums[j]) { // find: A[i]<A[j]
    i--
    j--
  }

  if (i >= 0) { // 不是最后一个排列 find: A[i]<A[k]
    while (nums[i] >= nums[k]) { // i < k的交换
      k--
    }
    [nums[i], nums[k]] = [nums[k], nums[i]] // swap A[i], A[k]
  }
  nums.sort((a, b, idx) => {
    console.log(idx)
  })

  // reverse A[j:end]
  let count = 1
  let sub = nums.slice(j).reverse()
  nums = nums.slice(0, j).concat(sub)
  console.log(nums)
}

/**
 * 最大值和前一个位置交换，如果最大值已在最左边，则和最右边交换
 */

// console.log(nextPermutation([1, 2, 3, 4, 6, 5]))
// console.log(nextPermutation([3, 2, 1]))
// console.log(nextPermutation([1, 1, 5]))
console.log(nextPermutation([1, 3, 2]))