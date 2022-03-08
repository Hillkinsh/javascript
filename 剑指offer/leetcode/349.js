/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 两个数组的交集
 * 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
示例 1：
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
 */

var nums1 = [1,2,2,1], nums2 = [2,2];
var intersection = function(nums1, nums2) {
  const map = {};
  const result = [];
  for (let i = 0; i < nums1.length; i++) {
    map[nums1[i]] = 1;
  }
  for (let j = 0; j < nums2.length; j++) {
    if (map[nums2[j]]) {
      result.push(nums2[j]);
      map[nums2[j]] = 0;
    }
  }
  return result;
};
console.log(intersection(nums1, nums2))