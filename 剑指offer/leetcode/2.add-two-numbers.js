/*
 * @lc app=leetcode id=2 lang=javascript
 *
 * [2] Add Two Numbers
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2, carry=0) {
  if (!l1 && !l2) {
    return null;
  } else {
    l1 = l1 ? l1 : new ListNode(0);
    l2 = l2 ? l2 : new ListNode(0);
  }
  let total = l1.val + l2.val + carry;
  let next = null;
  if (l1.next || l2.next) {
    next = addTwoNumbers(l1.next, l2.next, total <= 9 ? 0 : 1);
  } else if (total > 9) {
    next = new ListNode(1);
  }
  return new ListNode(total % 10, next);
};
// @lc code=end

