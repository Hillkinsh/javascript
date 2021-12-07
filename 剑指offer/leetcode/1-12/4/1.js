// 两个有序数组的中位数。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
//  var findMedianSortedArrays = function(nums1, nums2) {
//   // 情况1，num1和num2无重叠，取合并数组中间值即可。 [1,2] [3,4]
//   // 情况2，nums1和2有重叠，一方完全包含另一方 [1,2,3,4,5,6] [2,3,4,5]
//   // 情况3，有重叠，[1,2,3,4] [2,3,4,5]
//   let arr = [];
//   let i = 0; 
//   let j = 0;
//   let pos = (nums1.length + nums2.length) % 2 === 0;
//   while(i + j < nums1.length + nums2.length) {
//     if (i<nums1.length && j<nums2.length) {
//       if (nums1[i] < nums2[j]) {
//         arr.push(nums1[i]);
//         i++;
//       } else {
//         arr.push(nums2[j]);
//         j++;
//       }
//     } else if (i<nums1.length ) {
//       arr = arr.concat(nums1.slice(i));
//       break;
//     } else if (j<nums2.length ) {
//       arr = arr.concat(nums2.slice(j));
//       break;
//     }
//   }
//   if (arr.length % 2) {
//     return arr[Math.floor(arr.length / 2)]
//   } else {
//     return (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
//   }
// };

/**
 * Naive approach O((m+n)/2)
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * 7, 4, 1
 * 8, 34, 2, 0 1 2 3 4 5 6 7
 */
 var findMedianSortedArrays = function(nums1, nums2) {
  let halfLength = ((nums1.length + nums2.length) >> 1) + 1;
  let result = new Array(halfLength);
  let flag = (nums1.length + nums2.length) % 2 ? 1 : 2;
  // console.log('flag::', flag, halfLength)
  let n1 = 0;
  let n2 = 0;
  while(n1 + n2 <= halfLength && n1 < nums1.length && n2 < nums2.length) {
    if (nums1[n1] >= nums2[n2]) {
      result[n1 + n2] = nums2[n2];
      n2++;
    } else {
      result[n1 + n2] = nums1[n1];
      n1++;
    }
  }
  while(n1 + n2 <= halfLength && n1 < nums1.length) {
    result[n1 + n2] = nums1[n1];
    n1++;
  }
  while(n1 + n2 <= halfLength && n2 < nums2.length) {
    result[n1 + n2] = nums2[n2];
    n2++;
    // console.log('resul  :: n2', result)
  }
  return flag == 1 ? result[halfLength - 1] : (result[halfLength - 1] + result[halfLength - 2]) / 2;
};

const nums1 = [], nums2 = [3,4]

console.log(findMedianSortedArrays(nums1, nums2));
// 如果a的最大值比b的最小值小。取两个数组的中间值。

// 如果一个数组只有一个数字。那么二分查找