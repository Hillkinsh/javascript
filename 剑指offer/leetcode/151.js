/**
 * @param {string} s
 * @return {string}
 * 输入：s = "the sky is blue"
   输出："blue is sky the"
 */
// var reverseWords = function(s) {
//   s = s.split(" ");
//   const result = [];
//   for (let i = s.length - 1; i >= 0; i--) {
//     if (s[i]) {
//       if (result.length) {
//         result.push(' ')
//       }
//       result.push(s[i])
//     }
//   }
//   return result.join("")
// };

// 不实用split

function reverseWords(s) {
  // 字符串转数组
  const strArr = Array.from(s);
  // 移出空格
  rmSpace(strArr);
  //反转
  reverseArr(strArr);
  let slow = 0;
  // 反转单词
  for (let i = 0; i <= strArr.length; i++) {
    if ((strArr[i] === " " || !strArr[i])) {
      reverseArr(strArr, slow, i - 1);
      slow = i + 1;
    }
  }
  return strArr.join('');
}

function rmSpace(arr) {
  let prev = 0;
  let aft = 0;
  while(aft < arr.length) {
    if ((arr[aft] === " " && aft === 0) || (arr[aft] === " " && arr[aft] === arr[aft - 1])) {
      aft++;
    } else {
      arr[prev++] = arr[aft++];
      // prev++;
      // aft++;
    }
  }
  arr.length = prev;
  if (arr[prev - 1] === " ") {
    arr.length = prev - 1;
  }
}
function reverseArr(arr, prev, end) {
  prev = prev || 0;
  end = end !== undefined ? end : arr.length - 1;
  while(prev < end) {
    const tmp = arr[prev];
    arr[prev++] = arr[end];
    arr[end--] = tmp;
    // prev++;
    // end--;
  }
}

function reverseWords(s) {
  const arr = Array.from(s);
  // 去空格
  removeSpace(arr);
  // console.log('arr:', arr)
  // 反转
  reverseMyArr(arr, 0, arr.length - 1);
  // console.log('2', arr)
  // 反转单词
  let i = 0;
  let p = 0;
  while(i <= arr.length) {
    if (arr[i] === " " || !arr[i]) {
      reverseMyArr(arr, p, i - 1);
      p = i + 1;
    }
    i++;
  }
  return arr.join('');
}
function removeSpace(arr) {
  let i = 0;
  let p = 0;
  for (; i < arr.length; i++) {
    if(!(arr[i] === " " && (i === 0 || arr[i] === arr[i - 1]))) {
      arr[p++] = arr[i];
    }
  }
  
  arr.length = p;
  if (arr[p - 1] === " ") {
    arr.length = p - 1;
  }
}
function reverseMyArr(arr, i=0, j=0) {
  while(i < j) {
    let tmp = arr[i];
    arr[i++] = arr[j];
    arr[j--] = tmp;
  }
}

var reverseWords = function (s) {
  let arr = Array.from(s);
  // 去空格
  removeSpace();
  // 反转
  reverse(arr, 0, arr.length - 1);
  // 反转单词
  let i = 0;
  for (let j = 0; j <= arr.length; j++) {
    if (arr[j] === " " || arr[j] === undefined) {
      reverse(arr, i, j - 1);
      i = j + 1;
    }
  }
  console.log(arr.join(""))
  return arr.join("");

  function removeSpace() {
    let i = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === " ") {
        if (arr[j] === arr[j + 1] || j === arr.length - 1 || j === 0 || i === 0) {
          continue;
        } else {
          arr[i++] = arr[j]
        }
      } else {
        arr[i++] = arr[j]
      }
    }
    arr.length = i;
  }
  function reverse(arr, i, j) {
    while(i < j) {
      let tmp = arr[i];
      arr[i++] = arr [j];
      arr[j--] = tmp;
    }
  }
}

// var s = "  hello world  ";
// let arr = Array.from(s);
// rmSpace(arr)
// reverseArr(arr)
var s = "F R  I   E    N     D      S      "
var s = "   the    sky is blue "
// console.log(reverseWords(s))
console.log(reverseWords(s))
// console.log(arr)