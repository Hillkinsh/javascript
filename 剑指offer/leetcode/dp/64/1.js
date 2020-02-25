/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  let mLength = grid.length
  let nLength = grid[0].length
  for (let i = 0; i < mLength; i++) {
    for (let j = 0; j < nLength; j++) {
      if (i == 0 && j == 0) continue
      else if (i == 0) {
        grid[i][j] = grid[i][j] + grid[i][j - 1]
      } else if (j == 0) {
        grid[i][j] = grid[i][j] + grid[i - 1][j]
      } else {
        grid[i][j] = grid[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1])
      }
    }
  }
  return grid
};
// let arr = [
//   [1, 3, 1],
//   [1, 5, 1],
//   [4, 2, 1]
// ]
// console.log(minPathSum(arr))

/**
 * 最小》》》
 * 每个下标保存最小的值即可
 * 
 */