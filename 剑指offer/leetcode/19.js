/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

 function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
var removeNthFromEnd = function(head, n) {
  let pre = new ListNode(0, head);
  let ret = pre;
  let aft = head;
  let count = n;
  while(aft && count > 0) {
    aft = aft.next;
    count--
  }
  if (count > 0) {
    return ret;
  }

  while(aft) {
    pre = pre.next;
    aft = aft.next;
  }
  pre.next = pre.next.next;
  return ret.next;
};
var removeNthFromEnd = function(head, n) {
  let prev = head;
  let aft = head;
  let count = 0;
}