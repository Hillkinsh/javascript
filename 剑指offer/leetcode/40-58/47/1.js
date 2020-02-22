/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  let arr = nums.slice()
  arr.sort((a, b) => a - b)
  let length = arr.length
  let result = []
  let route = []
  let visitedHash = {}

  let backtrack = (route) => {
    if (route.length === length) {
      result.push(route)
      return
    }
    for (let i = 0; i < length; i++) {
      if (visitedHash[i] ||
        i > 0 && !visitedHash[i - 1] && arr[i - 1] == arr[i]
      ) continue
      visitedHash[i] = true
      route.push(arr[i])
      backtrack(route.slice())
      route.pop()
      visitedHash[i] = false
    }
  }
  backtrack(route)
  return result
};
// console.log(permuteUnique([1, 2, 2]))