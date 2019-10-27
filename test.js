/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var threeSum = function(nums) {
  // 先排序处理即可。
  let newNum = nums.sort((a, b) => {
    return a > b
  })
  // console.log(newNum)
  let target
  let result = []
  let obj = {}
  for (let pos = 0; pos<newNum.length; pos ++) {
    target = newNum[pos]
    obj = {}
    if (pos>0 && target == newNum[pos-1]) {
      continue
    }
    newNum.slice(pos+1).forEach(item => {
      if (obj[-target -item] != undefined) {
        if (result.length) {
          if (target == obj[-target -item] && target == item) {
            continue
          }
        }
        result.push([target, obj[-target -item], item])
      } else {
        obj[item] = item // 这个位置放的下标
      }
    })
  }
  return result
};

// -4, -1, -1, 0, 1, 2
console.log(threeSum([-1, 0, 1, 2, -1, -4]))