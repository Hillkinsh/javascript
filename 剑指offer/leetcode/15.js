/**
 * @param {number[]} nums
 * @return {number[][]}
 * 输入：nums = [-1,0,1,2,-1,-4]
   输出：[[-1,-1,2],[-1,0,1]]

   三数之和为 0
 */
 var threeSum = function(nums) {
  nums.sort((a, b) => a - b);
  const result = []; 
  const length = nums.length;
  let i = 0;
  if (nums[i] <= 0 && nums[length - 1] >= 0) {
    while (i < length - 2) {
      if (nums[i] > 0) break;
      let first = i + 1;
      let last = length - 1;
      while(first < last) {
        if (nums[i] * nums[last] > 0) break;
        let sum = nums[i] + nums[first] + nums[last];
        if (sum === 0) {
          result.push([nums[i], nums[first], nums[last]]);
        }
        if (sum <= 0) {
          while(first < last && nums[first] === nums[++first]) {}
        } else {
          while(first < last && nums[last] === nums[--last]) {}
        }
      }
      while (nums[i] === nums[++i]) {}
    }
  }
  return result;
};

var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  let len = nums.length;
  let i = 0;
  while(i < len - 2) {
    let pre = i + 1;
    let aft = len - 1;
    while(pre < aft) {
      
      const sum = nums[i] + nums[pre] + nums[aft];
      console.log(sum, ":sum", i, pre, aft)
      if (sum === 0) {
        result.push([nums[i], nums[pre], nums[aft]]);
      }
      if (sum <= 0) {
        while(pre < aft && nums[pre] === nums[++pre]) {}
      } else {
        while(pre < aft && nums[aft] === nums[--aft]) {}
      }
    }
    while(i < len - 2 && nums[i] === nums[++i]) {}
  }
  return result;
}

var threeSum = function(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  let i = 0;
  while (i < nums.length - 2) {
    let pre = i + 1;
    let aft = nums.length - 1;
    while(pre < aft) {
      const sum = nums[i] + nums[pre] + nums[aft];
      if (sum <= 0) {
        if (sum === 0) {
          result.push([nums[i], nums[pre], nums[aft]]);
          aft--;
          while(pre < aft && nums[aft] === nums[aft + 1]) {
            aft--;
          }
        }
        pre++;
        while(pre < aft && nums[pre] === nums[pre - 1]) {
          pre++;
        }
      }
      if (sum > 0) {
        aft--;
        while(pre < aft && nums[aft] === nums[aft + 1]) {
          aft--;
        }
      }
    }
    while(i < nums.length - 2 && nums[i + 1] === nums[i]) {
      i++;
    }
    i = i + 1;
  }
  return result;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
  const len = nums.length;
  if (len < 3) return [];
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < len - 2; i++) {
      if (nums[i] > 0)    break; // 优化点，都为正数，停止查找
      if (i > 0 && nums[i] === nums[i-1]) continue; // 优化2，和上一个值相同，不必查找
      let l = i + 1,
          r = len - 1;
      while (l < r) {
          const sum = nums[i] + nums[l] + nums[r];
          if (sum > 0)    { r--; continue;}
          if (sum < 0)    { l++; continue;}
          res.push([nums[i], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[++l]) {};
          while (l < r && nums[r] === nums[--r]) {};
      }
  }
  return res;
};
var nums = [-1,0,1,2,-1,-4,-2,-3,3,0,4]

// [-4, -3, -2, -1, -1, 0, 0, 1, 2, 3, 4]
console.log(threeSum(nums))

/**
 * 关键在2个。一个是基本实现，双指针法。
 * 一个是去重复，
 */