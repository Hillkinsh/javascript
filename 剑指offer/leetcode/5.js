/**
 * @param {string} s
 * @return {string}
 * s.replaceAll(" ", "%20")
 */
 var replaceSpace = function(s) {
   let result = [];
   for(let i = 0; i < s.length; i++) {
     if (s[i] === " ") {
       result.push("%20")
     } else {
       result.push(s[i]);
     }
   }
  return result.join('');
};
// [abc, bcd, ef]
var replaceSpace = function(s) {
  const arr = s.split(" ");
  let j = arr.length - 1;
  let space = arr.length - 1;
  arr.length = arr.length + space;
  for (; j > 0; j--) {
    arr[j + space] = arr[j];
    arr[j + space - 1] = "%20";
    space--;
  }
  return arr.join("");
}
var replaceSpace = function(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      count++;
    }
  }
  if (!count) {
    return s;
  }
  const arr = Array.from(s);
  arr.length = arr.length + 2 * count;
  for (let i = s.length - 1; i >= 0; i--) {
    if (arr[i] !== " ") {
      arr[i + 2 * count] = arr[i];
    } else {
      arr[i + 2 * count] = "0"
      arr[i + 2 * count - 1] = "2"
      arr[i + 2 * count - 2] = "%"
      count--;
      if (count === 0) {
        break;
      }
    }
  }
  return arr.join('');
}

var s = "We are happy.";

console.log(replaceSpace(s))