/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (!head || !head.next) return head
  let preNode = new ListNode(-1)
  preNode.next = head
  let count = 0
  let slow = preNode
  let fast = head.next
  let tempNode
  while (fast) {
    if (count % 2 === 0) {
      tempNode = fast.next
      fast.next = slow.next
      fast.next.next = tempNode
      slow.next = fast
      fast = fast.next
    }
    slow = slow.next
    fast = fast.next
    count++
  }
  return preNode.next
};
let l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4
      }
    }
  }
}

console.log(swapPairs(l1))