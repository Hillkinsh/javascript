var addTwoNumbers = function (l1, l2) {
  if (!l1 || !l2) {
    return JSON.parse(JSON.stringify(l1 || l2))
  }
  let result
  let temp
  let carry = 0
  let value = 0
  while (l1 && l2) {
    value = l1.val + l2.val + carry
    carry = value > 9 ? 1 : 0
    value = value % 10
    let node = new ListNode(value)
    if (!result) {
      temp = node
      result = temp
    } else {
      temp.next = node
      temp = temp.next
    }
    l1 = l1.next
    l2 = l2.next
  }
  let list = l1 || l2
  while (list) {
    value = list.val + carry
    carry = value > 9 ? 1 : 0
    value = value % 10
    let node = new ListNode(value)
    temp.next = node
    temp = temp.next
    list = list.next
  }
  if (carry) {
    temp.next = new ListNode(carry)
  }
  return result
}
/**
 * 思路：
 * 把只有单链表的时候赋值一下取出来，这样就少些一个while循环
 */
// (2 -> 4 -> 3) + (5 -> 6 -> 4)