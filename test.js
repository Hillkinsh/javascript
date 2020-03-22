var lengthOfLongestSubstring = function(s) {
    let arr = []
    let number = 0
    for (let i=0; i<s.length; i++) {
      if (arr.includes(s[i])) {
        number = arr.length > number ? arr.length: number
        arr = arr.slice(arr.indexOf(s[i]) + 1)
        arr.push(s[i])
      } else {
        arr.push(s[i])
      }
    }
    return Math.max(arr.length, number)
};

console.log(lengthOfLongestSubstring('dvdf'))