var maxArea = function (height) {
  let left = 0
  let right = height.length - 1
  let result = 0
  let minHigh
  while (left < right) {
    minHigh = Math.min(height[left], height[right])
    result = Math.max(
      minHigh * (right - left),
      result
    )
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return result
}
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))