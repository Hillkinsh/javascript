/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 * nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
 * 四数之和为0
 */
 var fourSumCount = function(nums1, nums2, nums3, nums4) {
  let result = 0;
  let map = {};
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const sum = nums1[i] + nums2[j];
      map[sum] = (map[sum] || 0) + 1;
    }
  }
  for (let k = 0; k < nums3.length; k++) {
    for (let l = 0; l < nums4.length; l++) {
      const sum = nums3[k] + nums4[l];
      if (map[sum * -1]) {
        result += map[sum * -1];
      }
      // map[sum * -1] = (map[sum] || 0) + 1;
    }
  }
  return result;
};

var nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2];

console.log(fourSumCount(nums1,nums2,nums3,nums4))
