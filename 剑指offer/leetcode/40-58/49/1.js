/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let result = []
  let hash = {}
  let count = 0
  let temp
  for (let i = 0; i < strs.length; i++) {
    temp = strs[i].split('').sort().join('')
    if (hash[temp] !== undefined) {
      result[hash[temp]].push(strs[i])
    } else {
      hash[temp] = count
      result[count] = [strs[i]]
      count++
    }
  }
  return result
};

// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))