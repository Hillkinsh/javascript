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
var maxArea2 = function (height) {
  let i = 0;
  let j = height.length - 1;
  let result = 0;
  while(i != j) {
    result = Math.max(result, Math.min(height[i], height[j]) * (j - i));
    if (height[i] < height[j]) {
      i++;
    } else {
      j--;
    }
  }
  return result;
}

// console.log(maxArea2([1, 8, 6, 2, 5, 4, 8, 3, 7]))
// console.log(maxArea2([1,1]))
// console.log(maxArea2([1,2,1]))
// console.log(maxArea2([4,3,2,1,4]))
console.log(maxArea2([2,3,4,5,18,17,6]))