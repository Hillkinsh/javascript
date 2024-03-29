// 给你两个整数数组 nums1 和 nums2，
// 请你以数组形式返回两数组的交集。
// 返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2,2]
// 示例 2:

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[4,9]


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersect = function(nums1, nums2) {
   if (nums2.length > nums1) {
     return intersect(nums2, nums1);
   }
  const result = [];
  const map = {};
  for (let i = 0; i < nums1.length; i++) {
    map[nums1[i]] = (map[nums1[i]] || 0) + 1
  }
  for (let j = 0; j < nums2.length; j++) {
    if (map[nums2[j]]) {
      result.push(nums2[j]);
      map[nums2[j]]--;
    }
  }
  return result;
};

// 如果已排序。
var intersectSort = function(nums1, nums2) {
  if (nums2.length > nums1) {
    return intersect(nums2, nums1);
  }
  const result = [];
  let i = 0;
  let j = 0;
  while(i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      i++;
    } else if (nums1[i] > nums2[j]) {
      j++;
    } else {
      result.push(nums1[i]);
      i++;
      j++;
    }
  }

  return result;
};


var nums1 = [1,2,2,3], nums2 = [2,3]
console.log(intersectSort(nums1, nums2))