// var twoSum = function (nums, target) {
//   let map = {}
//   for (let i = 0; i < nums.length; i++) {
//     let temp = target - nums[i]
//     if (map[temp] !== undefined) {
//       return [map[temp], i]
//     } else {
//       map[nums[i]] = i
//     }
//   }
// };

let nums = [2, 7, 11, 15]
let target = 9

var twoSum = function(nums, target) {
  const result = [];
  const obj = {
    [nums[0]]: 0
  };
  for (let i = 1; i<nums.length; i++) {
    let sub = target - nums[i];
    if (obj[sub] !== undefined) {
      result.push(i);
      result.push(obj[sub]);
      break;
    } else {
      obj[nums[i]] = i;
    }
  }
  return result;
};
console.log(twoSum(nums, target));