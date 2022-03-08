// 两两交换节点 链表

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let ret = new ListNode(0, head);
  let temp = ret;

  while (temp.next && temp.next.next) {
    // temp 节点 cur
    let two = temp.next.next; // 节点2.
    let one = temp.next; // 节点1.

    one.next = two.next; // 
    two.next = one;
    temp.next = two;

    temp = one;
  }
  return ret.next;
};

var swapPairs = function (head) {
  let pre = new ListNode(0, head);
  let result = pre;
  let one = pre.next;
  let two = null;
  while(pre.next && pre.next.next) {
    one = pre.next;
    two = pre.next.next;

    one.next = two.next;
    two.next = one;
    pre.next = two;
    pre = one;
  }
  return result.next;
}
var swapPairs = function (head) {
  let ret = new ListNode(0, head);
  let pre = ret;
  let one = pre.next;
  let two = null;
  while (pre.next && pre.next.next) {
    one = pre.next;
    two = pre.next.next;

    one.next = two.next;
    two.next = one;
    pre.next = two;

    pre = one;
  }
  return ret.next;
}