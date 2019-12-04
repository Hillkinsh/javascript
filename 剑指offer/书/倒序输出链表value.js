let list = {
  value: 0,
  next: null
}
let node = {
  value: 0,
  next: null
}
let iter = list
debugger
for (let i=0; i<1000000; i++) {
  iter.value = i;
  iter.next = { ...node }
  iter = iter.next
}

// console.log(list)

function recur (list) {
  if (list.next) {
    recur(list.next)
  }
  console.log(list.value)
}
// recur(list)
// console.log(replaceSpace('we are happy'))
function repeat(list) {
  let stack = []
  while(list.next) {
    stack.push(list.value)
    list = list.next
  }
  while(stack.length) {
    console.log(stack.pop())
  }
}
repeat(list)

// 递归的本质是一个栈结构。
// 递归执行会在链表很长时，函数调用栈溢出。
// 循环不错