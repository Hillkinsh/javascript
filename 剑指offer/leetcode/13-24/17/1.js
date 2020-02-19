/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return []
  let dict = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z']
  }
  // 根据长度做组合
  let result = []
  for (let i = 0; i < digits.length; i++) {
    result = getCombina(result, dict[+digits[i]])
    // console.log(result)
  }
  return result
};

function getCombina(arr1, arr2) {
  if (!arr1.length && !arr2.length) return []
  if (!arr1.length) return arr2
  if (!arr2.length) return arr1
  let result = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push(arr1[i] + arr2[j])
    }
  }
  return result
}