/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
  let pos1 = m - 1;
  let pos2 = n - 1;
  for (let i = m + n - 1; i >= 0; i--) {
    if (pos1 >= 0) {
      if (pos2 >= 0) {
        if (nums1[pos1] > nums2[pos2]) {
          nums1[i] = nums1[pos1];
          pos1--
        } else {
          nums1[i] = nums2[pos2];
          pos2--
        }
      } else {
        nums1[i] = nums1[pos1];
        pos1--
      }
    } else {
      nums1[i] = nums2[pos2];
      pos2--
    }
  }
};

var nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3;
merge(nums1, m, nums2, n)
console.log(nums1)
