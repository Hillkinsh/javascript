/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
  const map = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  }
  let result = [];

  function cur(currArr, result) {
    if (!result.length) {
      result = currArr;
    } else {
      let tmp = [];
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < currArr.length; j++) {
          tmp.push(result[i] + currArr[j]);
        }
      }
      result = tmp;
    }
    return result;
  }

  for (let i = 0; i < digits.length; i++) {
    result = cur(map[digits[i]], result);
  }
  return result;
 };

console.log(letterCombinations('29'))