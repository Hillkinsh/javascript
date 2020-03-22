// 非dp

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let result = 0
  if (!prices.length) return 0
  let min = prices[0]
  for (let i = 0; i < prices.length; i++) {
    result = Math.max(prices[i] - min, result)
    min = Math.min(min, prices[i])
  }
  return result
};
// let arr = [7,1,5,3,6,4]
// console.log(maxProfit(arr))