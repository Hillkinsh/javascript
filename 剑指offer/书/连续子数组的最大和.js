let arr = [1, -2, 3,-10,-4,7,2,-5]

function greatSum (arr) {
  if (!arr.length) return 
  let max = null
  let recur = null
  for (let i=0; i<arr.length; i++) {
    if (max === null && recur === null) {
      max = arr[i]
      recur = arr[i]
    } else {
      // recur 怎么迭代。
      recur = recur < 0
        ? arr[i]
        : recur + arr[i]
      max = Math.max(max, recur)
    }
  }
  return max
}

console.log(greatSum(arr))
