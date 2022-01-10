// function longestPalindrome(s) {
//   if (!s || s.length === 1) return s
//   let result = ''
//   let left
//   let right
//   for (let i = 1; i < s.length; i++) {
//     left = i
//     right = i
//     while (true) {
//       // 左右的位置的字符不能和当前一样。
//       if (left > 0 && s[left] == s[left - 1]) {
//         left--
//       } else if (right < s.length - 1 && s[right] == s[right + 1]) {
//         right++
//       } else {
//         break
//       }
//     } 
//     // 核心位置
//     // 移动到，所有的相同字符的最末端。
//     console.log(left, right)
//     i = right
//     // 比较位置
//     while (left >= 0 && right < s.length) {
//       // 对比不同的字符，左右侧是否相同。相同则同时移位。
//       if (left >= 1 && right < s.length - 1 && s[left - 1] == s[right + 1]) {
//         left--
//         right++
//         continue
//       }
//       // 直到不符合条件，产生一个新结果。如果新结果的长度大于老结果，替换
//       if (right + 1 - left > result.length) {
//         result = s.slice(left, right + 1)
//       }

//       break
//     }
//   }
//   if (right + 1 - left > result.length) {
//     result = s.slice(left, right + 1)
//   }
//   return result
// }
function l2(s) {
  if (!s || s.length < 2) return s;
  let result = "";
  let left = 0;
  let right = 0;
  for (let i = 1; i < s.length; i++) {
    left = i;
    right = i;
   
    while (left > 0 && s[left] === s[left - 1]) {
      left--;
    }
    while (right > s.length - 1 && s[right] === s[right + 1]) {
      right++;
    }

    i = right; // 优化无意义的for循环

    while(left > 0 && right < s.length - 1 && s[left - 1] === s[right + 1]) {
      left--;
      right++;
    }
    result = right + 1 - left > result.length ? s.slice(left, right + 1) : result;
  }
  return result;
}
// 找到核心区，两头扩。取最大
// 两个优化点：
//1 。for循环从1开始，因为从0开始，里面的while也不执行
// 2. i从最后一个相同的元素开始下一次循环，对abbbbbbbbbc有优化效果

console.log(l2('abbbac'))
console.log(l2('babad'))
console.log(l2('cbbd'))
console.log(l2('a'))
console.log(l2('ac'))