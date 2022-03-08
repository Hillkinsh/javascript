// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 示例 1：

// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]
// 排序后，数组变为 [0,1,9,16,100]

// 示例 2：

// 输入：nums = [-7,-3,2,3,11]
// 输出：[4,9,9,49,121]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortedSquares = function(nums) {
  let i = 0;
  let j = nums.length - 1;
  let result = new Array(nums.length);
  let pre;
  let after;
  while(i <= j) {
    pre = nums[i] * nums[i];
    after = nums[j] * nums[j];
    // console.log(pre, after)
    if (pre > after) {
      result[ j - i] = pre;
      i++;
    } else {
      result[ j - i] = after;
      j--;
    }
  }
  return result;
};

var nums = [-7,-3,2,3,11];
var sortedSquares = function (nums) {
  // 双边指针
  let p = 0;
  let q = nums.length - 1;
  while(p <= q) {
    let pp = nums[i] * nums[i];
    let qq = nums[j] * nums[j];
    if (pp < qq) {
      nums[j - i] = qq;
      j--
    } else {
      nums[j - i] = pp;
      i++
    }
  }
}
console.log(sortedSquares(nums))