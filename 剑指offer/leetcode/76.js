// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

// 注意：

// 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
// 如果 s 中存在这样的子串，我们保证它是唯一的答案。
//  

// 示例 1：
// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"

// 示例 2：
// 输入：s = "a", t = "a"
// 输出："a"
// 示例 3:

// 输入: s = "a", t = "aa"
// 输出: ""
// 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
// 因此没有符合条件的子字符串，返回空字符串。

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {
  let result = "";
  const data = {};
  const current = {};
  for (let k = 0; k < t.length; k++) {
    data[t[k]] = data[t[k]] ? data[t[k]] + 1 : 1;
    current[t[k]] = 0;
  }
  let i = 0;
  let wid = 0;
  for (let j = 0; j < s.length; j++) {
    if (!data[s[j]]) {
      continue;
    } else {
      current[s[j]] += 1;
    }
    while (hasT(data, current)) {
      if (!current[s[i]]) {
        i++;
        continue;
      }
      wid = j - i + 1;
      if (!result) {
        result = s.slice(i, j + 1)
      } else if (wid < result.length) {
        result = s.slice(i, j + 1)
      }
      
      if (current[s[i]]) {
        current[s[i]]--;
      }
      i++;
    }
  }
  return result;
};

function hasT(data, current) {
  let result = true;
  let keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    if (!current[keys[i]] || current[keys[i]] < data[keys[i]]) {
      result = false;
      break;
    }
  }
  return result;
}

// 如何巧妙的检查是否都在当前区间，右指针时，往里加，左指针时，往外删
var minWindow = function(s, t) {
  const n = s.length;
  const map = {};
  let start = 0;
  let minLen = Number.MAX_VALUE;
  let all = t.length;

  for (let c of t) {
    map[c] = (map[c] || 0) + 1;
  }

  let l = 0;
  let r = 0;
  console.log(map)
  while (r < n) {
    console.log(map, all)
    if (map[s[r]] !== undefined && --map[s[r]] >= 0) {
      all--;
    }
    console.log(all, map[s[r]])
    while (all === 0) {
      let len = r - l + 1;

      if (len < minLen) {
        start = l;
        minLen = len;
      }

      if (map[s[l]] !== undefined && ++map[s[l]] > 0) {
        all++;
      }

      l++;
    }
    r++;
  }

  return minLen === Number.MAX_VALUE ? '' : s.substr(start, minLen);
};

var minWindow = function (s, t) {
  const n = s.length;
  const map = {};
  let start = 0;
  let minLen = Number.MAX_VALUE;
 
  let all = t.length;

  for (let i of t) {
    map[i] = map[i] ? map[i] + 1 : 1;
  }  
  let r = 0;
  let l = 0;
  while(r < n) {
    if (map[s[r]] !== undefined) {
      map[s[r]]--;
      if (map[s[r]] >= 0) {
        all--;
      }
    }
    
    while(all === 0) {
      let len = r - l + 1;
      if (len < minLen) {
        start = l;
        minLen = len;
      }
      if (map[s[l]] !== undefined) {
        ++map[s[l]]
        if (map[s[l]] > 0) {
          all++;
        }
      }
      l++;
    }
    r++;
  }
  return minLen === Number.MAX_VALUE ? "" : s.substr(start, minLen);
}
function minWindow2(s, t) {
  let map = {};
  for (let c of t) {
    map[c] = (map[c] || 0) + 1;
  }
  let l = 0;
  let r = 0;
  let minLen = Number.MAX_VALUE;
  let all = t.length;
  let start = 0;
  while(r < s.length) {
    if (map[s[r]] !== undefined) {
      map[s[r]]--;
      if (map[s[r]] >= 0) {
        all--;
      }
    }
    while (all === 0) {
      let len = r - l + 1;
      if (minLen > len) {
        start = l;
        minLen = len;
      }
      // minLen = minLen < len ? minLen : len;
      if (map[s[l]] !== undefined) {
        map[s[l]]++;
        if (map[s[l]] > 0) {
          all++;
        }
      }
      l++;
    }
    r++;
  }
  return minLen === Number.MAX_VALUE ? "" : s.substr(start, minLen)
}
var s = "ADOBECODEBANC", t = "ABC"
// var s = "a", t = "a"
// var s = "a", t = "aa"

console.log(minWindow2(s, t))
// 输出："BANC"