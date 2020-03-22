/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let result = []
  let route = []
  let backtrack = (tempArr, target, n) => {
    if (target < 0) return
    if (target === 0) {
      result.push(tempArr)
      return
    }
    for (let i = n; i < candidates.length; i++) {
      tempArr.push(candidates[i])
      backtrack(tempArr.slice(), target - candidates[i], i)
      tempArr.pop()
    }
  }
  backtrack(route, target, 0)
  return result
};

console.log(combinationSum([2, 3, 6, 7], 7))