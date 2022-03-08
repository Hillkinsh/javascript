// 环形链表

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function retCycle(head) {
  if (!head || !head.next) return null;
  let slow = head;
  let fast = head;
  while(fast) {
    fast = fast.next && fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      return slow
    }
  }
  return null;
}
var detectCycle = function(head) {
   let ret = retCycle(head);
    if (ret) {
      let prev = head;
      let aft = ret
      while(prev !== aft) {
        prev = prev.next;
        aft = aft.next;
      }
      ret = prev;
    }
    return ret;
};
