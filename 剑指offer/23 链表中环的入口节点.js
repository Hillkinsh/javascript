// 找一个链表中，是否有环，有的话找到环的入口
// 是否有环：双指针不同速度
// 环长：指针同值
// 根据环长，双指针
function returnTargetNode (list) {
  if (!list) return null
  let length = getLoopLengthIfHas(list)
  if (!length) return null
  return returnNode(list, length)
}

function loopList () {
  // 如何实现一个环
  let node = value => {
    return {
      value: value,
      next: null
    }
  }
  let head = node(1)
  head.next = node(2)
  let start = head.next.next = node(3)
  start.next = node(4)
  start.next.next = node(5)
  let end = start.next.next.next = node(6)
  end.next = start
  return head
}

function hasLoopFn(head) {
  let pNode1 = head
  let pNode2 = head
  while (pNode2.next) {
    pNode1 = pNode1.next;
    pNode2 = pNode2.next
    if (pNode2.next) {
      pNode2 = pNode2.next
    } else {
      return false
    }
    if (pNode1.next === pNode2.next) {
      return true
    }
  }
}
function printLoop () {
  let head = loopList()
  for(let i=0; i<30; i++) {
    console.log(head.value)
    head = head.next
  }
}
function getLoopLengthIfHas (head) {
  let pNode1 = head
  let pNode2 = head
  let flag = false
  let targetNode = null
  let count = 0
  while (pNode2.next) {
    pNode1 = pNode1.next
    pNode2 = pNode2.next
    if (!flag) {
      if (pNode2.next) {
        pNode2 = pNode2.next
      } else {
        return false
      }
      if (pNode1.next === pNode2.next) {
        flag = true
        targetNode = pNode1
      }
    } else {
      count++
      if (pNode1 === targetNode) {
        return count
      }
    }
  }
}
function returnNode (head, length) {
  let pNode1 = head;
  let pNode2 = head
  for (let i=0; i<length; i++) {
    pNode2 = pNode2.next
  }
  while (pNode1 !== pNode2) {
    pNode2 = pNode2.next
    pNode1 = pNode1.next
  }
  return pNode1
}
console.log(returnTargetNode(loopList()))