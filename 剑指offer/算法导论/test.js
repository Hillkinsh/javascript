// FIND-MAX-CROSSING-SUBARRAY(A, low, mid, high)
/**
 * left-sum = -9999
 * sum = 0
 * for i mid downto low
 *   sum = sum + A[i]
 *   if sum > left-sum
 *     left-num = sum
 *     max-left = i
 * right-sum = -9999
 * sum = 0
 * for j = mid + 1 to high
 *   sum = sum + A[j]
 *   if sum > right-num
 *     right-num = sum
 *     max-right = j
 * return (max-left, max-right, left-num + right-sum)
 */

 /**
  *  FIND-MAXIMUM-SUBARRAY(A, low, high)
  * 
  * if high == low
  *   return (low, high, A[low])
  * else mid = floor((low + high) / 2)
  *   (left-low, left-high, left-sum) = FIND-MAXIMUM-SUBARRAY(A, low, mid)
  *   (right-low, right-high, right-sum) = FIND-MAXIMUM-SUBARRAY(A, mid+1, high)
  *   (cross-low, cross-high, cross-sum) = FIND-MAXIMUM-SUBARRAY(A, low, mid, high)
  * if left-sum >= right-sum && left-sum >= cross-sum
  *   return (left-low, left-high, left-sum)
  * else-if right-sum>=left-sum && right-sum>=cross-sum
  *   return (right-low, right-high, right-sum)
  * else return (cross-low, cross-high, cross-sum)
  */
 // 分治法求最大横跨的子数组
 function find_max_cross_subarr(arr, low, mid, high) {
   if (!arr || low>mid || low>high || mid>high) {
     throw new Error('传参不正确')
   }
   if (arr.length === 1) {
     return {
       low,
       high:low,
       sum:arr[low]
     }
   }
   let left_sum = -Infinity
   let max_left = null
   let sum = 0
   for (let i = mid; i>= low; i--) {
     sum += arr[i]
     if (sum > left_sum) {
       left_sum = sum
       max_left = i
     }
   }
   sum = 0
   let right_sum = -Infinity
   let max_right = null
   for (let i = mid + 1; i < high; i++) {
     sum += arr[i]
     if (sum > right_sum) {
       right_sum = sum
       max_right = i
     }
   }
   max_right = Math.max(right_sum,sum)
   console.log( {low, mid, high, max_left, max_right, sum: left_sum + right_sum })
   return { low:max_left, high:max_right, sum: left_sum + right_sum }
 }

 // 最大子数组
 function find_max_subarr (arr, low, high) {
   if (!arr || low > high) {
     throw new Error('输入参数有误')
   }
   if (high == low) {
     return {low , high, sum:arr[low]}
   } else {
     mid = Math.floor((low + high) / 2)
     let {
       low: left_low,
       high: left_high,
       sum: left_sum
      } = find_max_subarr(arr, low, mid)
    //  console.log(find_max_subarr(arr, mid + 1, high))
     let {
       low: right_low,
       high: right_high,
       sum:right_sum
      } = find_max_subarr(arr, mid + 1, high)
     let {
       low:cross_low,
       high:cross_high,
       sum:cross_sum
      } = find_max_cross_subarr(arr, low, mid, high)
     if (left_sum >= right_sum && left_sum >= cross_sum) {
       return { low: left_low, high: left_high, sum: left_sum }
     } else if (right_sum >= left_sum && right_sum >= cross_sum) {
       return { low: right_low, hight: right_high, sum: right_sum }
     } else {
       return { low: cross_low, high: cross_high, sum: cross_sum }
     }
   }
 }

 let arr = [13,-3,-25,20,-3,-16,-23,-18,20,-7,12,-5,-22,15,-4,7]
 console.log(find_max_subarr(arr, 0, 16))