/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let resArr = [0]
  if (prices.length <= 1) {
    return 0
  }
  for (let i = 1; i < prices.length; i++) {
    let min = prices[0]
    let minPos = 0
    let pre = prices.slice(minPos, i)
    pre.forEach((item, idx) => {
      if (item < min) {
        min = item
        minPos = idx
      }
    })
    let sub = prices[i] - min < 0 ? 0 : prices[i] - min
    resArr.push(Math.max(sub, resArr[i - 1]))
  }
  return resArr[prices.length - 1]
};
// let arr = [7,1,5,3,6,4]
// console.log(maxProfit(arr))