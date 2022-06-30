/*
 * @lc app=leetcode id=4 lang=javascript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  // 情况1，num1和num2无重叠，取合并数组中间值即可。 [1,2] [3,4]
  // 情况2，nums1和2有重叠，一方完全包含另一方 [1,2,3,4,5,6] [2,3,4,5]
  // 情况3，有重叠，[1,2,3,4] [2,3,4,5]
  // 时间复杂度太高，如何降下来
  let arr = [];
  let i = 0; j = 0;
  while(i + j < nums1.length + nums2.length) {
    if (i<nums1.length && j<nums2.length) {
      if (nums1[i] < nums2[j]) {
        arr.push(nums1[i]);
        i++;
      } else {
        arr.push(nums2[j]);
        j++;
      }
    } else if (i<nums1.length ) {
      arr = arr.concat(nums1.slice(i));
      break;
    } else if (j<nums2.length ) {
      arr = arr.concat(nums2.slice(j));
      break;
    }
  }
  if (arr.length % 2) {
    return arr[Math.floor(arr.length / 2)]
  } else {
    return (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
  }
};
// @lc code=end

var findMedianSortedArrays = function(nums1, nums2) {

};
console.log(findMedianSortedArrays([1,2], [3, 4]))
