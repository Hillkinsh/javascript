/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    let stack = []
    let pathArr = path.split('/')
    pathArr.forEach(item => {
      if (item === '..') { // 出栈
        stack.pop()
      } else if (item && item !== '.') {
        stack.push(item)
      }
    })
    let result = ''
    stack.forEach(item => {
      result = result + '/' + item
    })
    return result || '/'
};

// let str = '/home/'
// let str2 = '/../'
// let str3 = '/home//foo/'
// let str4 = '/a/./b/../../c/'
// let str5 = '/a/../../b/../c//.//'
// let str6 = '/a//b////c/d//././/..'
// let str7 = "/home/foo/./bar/"
// console.log(simplifyPath(str))
// console.log(simplifyPath(str2))
// console.log(simplifyPath(str3))
// console.log(simplifyPath(str4))
// console.log(simplifyPath(str5))
// console.log(simplifyPath(str6))
// console.log(simplifyPath(str7))