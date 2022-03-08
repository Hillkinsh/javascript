// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

// 示例：

// 输入：s = 7, nums = [2,3,1,2,4,3] 输出：2 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
function minSubArrayLen(target, nums) {
  let result = -1;
  let sum = 0;
  let i = 0;
  let windLength = 0;
  for (let j = 0; j < nums.length; j++) {
    sum += nums[j];
    while(sum >= target) {
      windLength = j - i + 1;
      if (result !== -1) {
        result = windLength < result ? windLength : result;
      } else {
        result = windLength
      }
      sum -= nums[i];
      i++;
    }
  }
  return result === -1 ? 0 : result;
}


var s = 7, nums = [2,3,1,2,4,3];

console.log(minSubArrayLen(s, nums))