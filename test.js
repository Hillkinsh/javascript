/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  var tempStr = '';
  var char = '';
  var len = s.length;
  var max = 0;
  for (var i = 0; i < len; i++) {
    char = s[i];
    if (tempStr.indexOf(char) != -1) {
      if (tempStr.length > max)
        max = tempStr.length;
      tempStr = tempStr.substring(tempStr.indexOf(char) + 1, tempStr.length);
    }
    tempStr += s[i];
    if (max < tempStr.length) {
      max = tempStr.length;
    }
  }
  if (max == 0 && len > 0) {
    return len;
  }
  return max;
};

console.log(lengthOfLongestSubstring('abcabcbb'))