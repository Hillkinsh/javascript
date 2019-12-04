let node = value => {
  return {
    value: value,
    next: null
  }
}
function reverseList (head) {
  if (!head || !head.next) return head
  let save = node
  let current = head.next;
  let result = head
  result.next = null
  while (current) {
    let node = save(current.value)
    node.next = result
    result = node
    current = current.next
  }
  return result
}
let list = {
  value: 1,
  next: {
    value:2,
    next: {
      value:3,
      next: {
        value: 4,
        next: {
          value:5,
          next:null
        }
      }
    }
  }
}
console.log(reverseList(list))

// js 的对象容易乱指向，导致出现环。
// 现在的解决办法是，创建一个节点方法，每次创建一个节点
