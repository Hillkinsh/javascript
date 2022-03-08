/**
 * @param {string} s
 * @return {boolean}
 * 
 * abaf abafabaf
 */
var getNext = function (needle) {
  var j = 0;
  const next = [];
  next.push(j);

  for (let i = 1; i < needle.length; i++) {
    while(j > 0 && needle[i] !== needle[j]) {
      j = next[j - 1]
    }
    if (needle[i] === needle[j]) {
      j++;
    }
    next.push(j)
  }
  return next;
}
// asdfasdfasdf
// a 0
// as 0
// asd 0
// asdf 0
// asdfa a fa dfa sdfa a as 1
// asdfas s as fas dfas sdfas a as asd asdf asdfa 2
// asdfasd d sd asd fasd dfasd sdfasd a as asd asdf asdfa asdfas 3
// asdfasdf f df sdf asdf fasdf dfasdf sdfasdf a as asd asdf asdfa asdfas 4
// asdfasdfasdf f df sdf asdf fasdf dfasdf sdfasdf asdfasdf
var repeatedSubstringPattern = function(s) {
  const next = getNext(s);
  const n = s.length;
  if (next[n - 1] != 0 && n % (n - next[n - 1]) == 0) {
		return true
	}
	return false
};

console.log(getNext('asdfasdfasdf'))