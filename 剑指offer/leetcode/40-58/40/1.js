/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  let arr = candidates.slice()
  arr.sort((a, b) => a - b)
  let res = [];
  let route = [];
  let backtrack = (route, target, start) => {
    if (target === 0) {
      res.push(route)
      return
    }
    for (let i = start; i < arr.length; i++) {
      if (target < arr[i]) return
      if (i > start && arr[i - 1] == arr[i]) continue;
      route.push(arr[i])
      backtrack(route.slice(), target - arr[i], i + 1)
      route.pop()
    }
  }
  backtrack(route, target, 0);
  return res;
};

let candidates = [10, 1, 2, 7, 6, 1, 5],
  target = 8
console.log(combinationSum2(candidates, target))