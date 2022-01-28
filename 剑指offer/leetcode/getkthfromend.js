function ListNode(val) {
       this.val = val;
       this.next = null;
   }
var getKthFromEnd = function(head, k) {
  let count = 0;
  let before = new ListNode();
  before.next = head;
  let pre = head;
  while(pre) {
      count++;
      if (count >= k) {
          before = before.next;
      }
      pre = pre.next;
  }
  return before
};

let l = {
  val: 1,
  next: {
    val: 2,
    next: null
  }
}
let l2 = {
  val: 1,
  next: null
}

console.log(getKthFromEnd(l, 1));