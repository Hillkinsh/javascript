/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  if (!head) return head
  if (!head.next && n === 1) return null
  let preNode = new ListNode(-1)
  preNode.next = head
  let slow = preNode
  let fast = head
  while (n > 1) {
    fast = fast.next
    n--
  }
  while (fast.next) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return preNode.next
};