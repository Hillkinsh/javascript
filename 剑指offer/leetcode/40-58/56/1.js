/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (!intervals.length || intervals.length === 1) return intervals
  let result = []
  let arr = intervals.sort((a, b) => a[0] - b[0])
  let left = arr[0][0]
  let right = arr[0][1]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][1] < left || arr[i][0] > right) {
      result.push([left, right])
      left = arr[i][0]
      right = arr[i][1]
    } else {
      left = Math.min(left, arr[i][0])
      right = Math.max(right, arr[i][1])
    }
  }
  result.push([left, right])

  return result
  // console.log(result)
};

// console.log(merge([
//   [1, 3],
//   [2, 6],
//   [8, 10],
//   [15, 18]
// ]))