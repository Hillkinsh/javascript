// 输入：head = [1,2,6,3,4,5,6], val = 6
// 输出：[1,2,3,4,5]
// 示例 2：

// 输入：head = [], val = 1
// 输出：[]
// 示例 3：

// 输入：head = [7,7,7,7], val = 7
// 输出：[]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

var removeElements = function(head, val) {
  let pre = new ListNode(0, head);
  let i = pre;
  while(pre.next) {
    if (pre.next.val === val) {
      pre.next = pre.next.next
    } else {
      pre = pre.next;
    }
  }
  return i.next;
};
const head = {
  val: 1,
  next: {
    val: 6,
    next:
    {
      val: 3,
      next: {
        val: 6,
        next: null,
        //  {
        //   val: 4,
        //   next: {
        //     val: 5,
        //     next: {
        //       val: 6,
        //       next: null
        //     }
        //   }
        // }
      }
    }
  }
}

console.log(JSON.stringify(removeElements(head, 6)))