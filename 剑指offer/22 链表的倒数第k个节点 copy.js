let list = {
  value: 1,
  next: {
    value:2,
    next: {
      value:3,
      next: {
        value: 4,
        next: {
          value:5,
          next:null
        }
      }
    }
  }
}

/* function ListNode(x){
 this.val = x;
 this.next = null;
 }*/

 // 他这个链表理解的，比我透彻
 function FindKthToTail(head, k) {
  if (head === null || k <= 0) return null;

  let pNode1 = head
  let pNode2 = head
  console.log(pNode1 === pNode2)
  while (--k) {
    if (pNode2.next) {
      pNode2 = pNode2.next;
    } else {
      return null;
    }
  }
  while (pNode2.next !== null) {
    pNode1 = pNode1.next;
    pNode2 = pNode2.next;
  }
  return pNode1;
}

console.log(FindKthToTail(list, 3))