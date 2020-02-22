/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let length = matrix.length
  let temp
  for (let i = 0; i < length; i++) {
    for (let j = i; j < length; j++) {
      if (i !== j) {
        temp = matrix[i][j]
        matrix[i][j] = matrix[j][i]
        matrix[j][i] = temp
      }
    }
  }
  for (let k = 0; k < length; k++) {
    matrix[k] = matrix[k].reverse()
  }
};