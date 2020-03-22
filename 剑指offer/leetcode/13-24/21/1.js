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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (!l1 && !l2) return null
  let curPoint = new ListNode(-1)
  let root = curPoint

  while (l1 && l2) {
    if (l1.val < l2.val) {
      curPoint.next = l1
      l1 = l1.next
    } else {
      curPoint.next = l2
      l2 = l2.next
    }
    curPoint = curPoint.next
  }
  let list = l1 || l2
  curPoint.next = list
  return root.next
};


let l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4
    }
  }
}
let l2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4
    }
  }
}

console.log(mergeTwoLists(l1, l2))