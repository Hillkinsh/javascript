/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 链表相交
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    let pA = headA;
    let pB = headB;
    if (!pA || !pB) return null;
    // let count = 10;
    while(pA || pB) {
      // count--;
      // if (!count) return;
      // console.log(pA, pB)
      if (pA === pB && pA !== null) {
        return pA;
      }
      if (!pA.next && pB.next) {
        pA = headB;
      }
      if (!pB.next && pA.next) {
        pB = headA;
      }
      pA = pA.next;
      pB = pB.next;
    }
    return null;
};

const headA = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null
    }
  }
}

const headB = {
  val: 4,
  next: {
    val: 5,
    next: headA.next
  }
}

console.log(getIntersectionNode(headA, headB));
