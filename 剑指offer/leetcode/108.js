/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
 var sortedArrayToBST = function(nums) {
  if (!nums || !nums.length) return null;
  const head = {
    val: 0,
    left: null,
    right: null
  };
  const mid = Math.floor(nums.length / 2);
  head.val = nums[mid];
  head.left = sortedArrayToBST(nums.slice(0, mid));
  head.right = sortedArrayToBST(nums.slice(mid + 1));
  return head;
};

var sortedArrayToBST = function (nums) {
  if (!nums || !nums.length) {
    return null
  }
  let head = {
    val: '',
    left: null,
    right: null
  }
  let midPos = Math.floor(nums.length / 2)
  head.val = nums[midPos]
  head.left = sortedArrayToBST(nums.slice(0, midPos))
  head.right = sortedArrayToBST(nums.slice(midPos + 1, nums.length))
  return head
};