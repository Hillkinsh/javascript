function isList (arr1, arr2) {
  if (arr1.length !== arr2.length) return false

  let stack = []
  for (let i=0; i<arr2.length; i++) {
    // 跟栈顶元素比较
    // 栈顶为空，和arr1的元素比较
    //    相同，i++
    //    不同，入栈，
    //    arr1空了arr2还没到头，返回false
    while (arr2[i]) {
      if (arr1.length && arr2[i]===arr1[0]) {
        arr1.shift()
        break;
      }
      else if (arr2[i]===stack[stack.length - 1]) {
        stack.pop()
        break;
      } else {
        if (arr1.length) {
          stack.push(arr1.shift())
        } else {
          return false
        }
      }
    }
  }
  return !arr1.length && !stack.length
}

console.log(isList([1,2,3,4,5],[4,3, 5,1,2]))
console.log(isList([1,2,3,4,5],[4,5, 3,2,1]))
