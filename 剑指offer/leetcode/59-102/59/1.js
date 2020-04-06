/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
let result = []
let left = 0
let right = n - 1
let down = n - 1
let up = 0
let value = 1

while (value <= n * n) {
  for (let i = left; i <= right; i++) {
    if (!result[left]) result[left] = []
    result[left][i] = value++
  }
  left++
  for (let i = left; i <= down; i++) {
    if (!result[i]) result[i] = []
    result[i][down] = value++
  }
  right--
  for (let i = right; i >= up; i--) {
    if (!result[down]) result[down] = []
    result[down][i] = value++
  }
  down--
  for (let i = down; i >= left; i--) {
    if (!result[i]) result[i] = []
    result[i][up] = value++
  }
  up++

}
return result
};

// console.log(generateMatrix(3))