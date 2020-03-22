/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let length = triangle.length - 1
  if (!triangle.length) return 0
  let result = Math.min(...triangle[length])
  let pos = triangle[length].indexOf(result)
  // console.log(result, pos)
  for (let i = length - 1; i >= 0; i--) {
    let temp = getMinandIndex(triangle[i], pos - 1, pos)
    result += parseInt(temp.result)
    pos = parseInt(temp.pos)
  }
  return result
};

function getMinandIndex(arr, i, j) {
  let result
  let pos
  if (i >= 0 && j < arr.length) {
    result = Math.min(arr[i], arr[j])
  } else if (i >= 0 && j >= arr.length) {
    result = arr[i]
  } else if (i < 0 && j < arr.length) {
    result = arr[j]
  }
  pos = arr.indexOf(result)
  // console.log('result:', arr, result, pos, 'i:', i, j)
  return {
    result,
    pos
  }
}

// let triangle = [
//   [2],
//   [3, 4],
//   [6, 5, 7],
//   [4, 1, 8, 3]
// ]

// let tri = [
//   [-1],
//   [2, 3],
//   [1, -1, -3]
// ]

// console.log(minimumTotal(tri))