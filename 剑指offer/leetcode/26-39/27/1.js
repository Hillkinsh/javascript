/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// var removeElement = function (nums, val) {
//   if (!nums.length) return 0
//   let pos = 0
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== val) {
//       nums[pos] = nums[i]
//       pos++
//     }
//   }
//   return pos
// };

var removeElement = function (nums, val) {
  if (!nums.length) return 0
  let pos = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[pos] = nums[i]
      pos++
    }
  }
  return pos
};


console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2))