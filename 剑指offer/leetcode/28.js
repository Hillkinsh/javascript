/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

//  输入：haystack = "hello", needle = "ll"
//  输出：2
//  示例 2：
 
//  输入：haystack = "aaaaa", needle = "bba"
//  输出：-1
//  示例 3：
 
//  输入：haystack = "", needle = ""
//  输出：0
 
var strStr = function(haystack, needle) {
  let result = -1;
  if (!needle) return 0;
  let i = 0;
  while (i <= haystack.length - needle.length) {
    if (haystack[i] === needle[0]) {
      // console.log('i:::', i)
      let j = 0;
      let match = true;
      for (; j < needle.length; j++) {
        // console.log('for i:', i, j, needle[j], haystack[i + j])
        if (needle[j] !== haystack[i + j]) {
          match = false;
          break;
        }
      }
      // console.log('j:', j)
      if (match) {
        result = i;
        break;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  return result;
};
// KMP的经典思想就是:当出现字符串不匹配时，可以记录一部分之前已经匹配的文本内容，利用这些信息避免从头再去做匹配。

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
 var strStr = function (haystack, needle) {
  if (needle.length === 0)
      return 0;

  const getNext = (needle) => {
      let next = [];
      let j = 0;
      next.push(j);

      for (let i = 1; i < needle.length; ++i) {
          while (j > 0 && needle[i] !== needle[j])
              j = next[j - 1];
          if (needle[i] === needle[j])
              j++;
          next.push(j);
      }

      return next;
  }

  let next = getNext(needle);
  console.log('next:', next)
  let j = 0;
  for (let i = 0; i < haystack.length; ++i) {
      while (j > 0 && haystack[i] !== needle[j])
          j = next[j - 1];
      if (haystack[i] === needle[j])
          j++;
      if (j === needle.length)
          return (i - needle.length + 1);
  }

  return -1;
};
var haystack = "hello", needle = "ll";
var haystack = "aaaaa", needle = "bba";
// var haystack = "", needle = "";
var haystack = "a", needle = "a";
var haystack = "mississippi", needle = "issip";
// var haystack = "mississippi", needle = "issipi";
// // "mississippi"
// "issipi"
// console.log(strStr(haystack, needle))


const getNext = (needle) => {
  let next = [];
  // i 后缀末尾位
  // j 前缀末尾位
  let j = 0;
  next.push(j);

  for (let i = 1; i < needle.length; i++) {
    while (j > 0 && needle[i] !== needle[j]) {
      j = next[j - 1];
    }
    if (needle[i] === needle[j]) {
      j++;
    }
    next.push(j);
  }
  return next;
}
function getMyNext (needle) {
  // i 后缀末尾位
  // j 前缀末尾位
  const result = [0];
  let i = 1;
  let prev = 0;
  let after;
  let count = 0;
  for (; i < needle.length; i++) {
    prev = 0;
    count = 0;
    after = i;
    while(prev < after) {
      if (needle[prev] === needle[after]) {
        count++;
        prev++;
        after--;
        if (prev >= after) {
          result.push(count);
          break;
        }

      } else {
        result.push(count);
        break;
      }
    }
  }
  return result;
}
// aab b, ab, a, aa,
// aaba a,ba,aba a aa, aab
// aabaa a aa baa abaa a aa aab aaba
// aabaaf f af aaf baaf abaaf a aa aab aaba aabaa
// issip p ip sip ssip i is iss issi
// issi i si ssi i is iss
function getNext2(needle) {
  let next = [];
  let j = 0;
  next.push(j)

  for (let i = 1; i < needle.length; i++) {
    while(j > 0 && needle[i] !== needle[j]) {
      j = next[j - 1]
    }
    if (needle[i] === needle[j]) {
      j++
    }
    next.push(j)
  }
  return next;
}

function getNext2(needle) {
  let next = [];
  let j = 0;
  next.push(j)

  for (let i = 1; i < needle.length; i++) {
    while(j > 0 && needle[i] !== needle[j]) {
      j = next[j - 1]
    }
    if (needle[i] === needle[j]) {
      j++
    }
    next.push(j)
  }
  return next;
}
var strStr = function (haystack, needle) {
  while(!needle) return 0;
  let j = 0;
  let next = getNext2(needle);
  for (let i = 0; i < haystack.length; i++) {
    while(j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1]
    }
    if (haystack[i] === needle[j]) {
      j++
    }
    if (j === needle.length) {
      return i - needle.length + 1
    }
  }
  return -1;
}
console.log('my next:aabaaf:',getNext2('aabaaf'))
console.log('next:  aabaaf :', getNext2('aabaaf'))
console.log('my next:needle:',getNext2(needle)) // issip
console.log('next:  needle :', getNext2(needle))
console.log(strStr(haystack, needle))
console.log(strStr('aabaabaaf', 'aabaaf'))
