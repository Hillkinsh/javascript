// 反转链表

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
 
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
  if (!head) {
    return head;
  }
  const arr = [];
  let cur = head;
  while (cur) {
    arr.push(cur);
    cur = cur.next;
  }
  // console.log(arr)
  let result = new ListNode(0, arr[arr.length - 1])
  for (let i = arr.length - 1; i > 0; i--) {
    arr[i].next = arr[i - 1]
  }
  arr[0].next = null;
  return result.next;
};

var reverseList = function(head) {
  if (!head || !head.next) return head;
  let cur = head;
  let pre = null;
  let temp =null;

  while(cur) {
      temp = cur.next; 
      cur.next = pre;
      pre = cur;
      cur = temp;
  }
  return pre ;
}
var reverseList = function(head) {
  if (!head || !head.next) return head;
  let cur = head;
  let pre = null;
  let tmp = null;
  while(cur) {
    tmp = cur.next; // 下一个引用做缓存
    cur.next = pre; // 当前的指向前一个
    pre = cur; // 前一个 挪到当前
    cur = tmp; // 当前挪到下一个
  }
  return pre;
}
var reverseList = function(head) {
  let pre = null;
  let cur = head;
  while(cur) {
    let tmp = cur.next; // 下个节点
    cur.next = pre; // 当前及诶单反指向。
    pre = cur; // 前一节点移到当前节点
    cur = tmp; // 当前节点移向下一节点
  }
  return pre;
}

let list = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null
    }
  }
};

console.log(reverseList(list))