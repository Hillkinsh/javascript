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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function(lists) {
  let pre = new ListNode();
  let result = pre;
  let arr = [];
  for (let i = 0; i < lists.length; i++) {
    arr.push(lists[i]);
  }
  let tag = true;
  while(tag) {
    const next = haveNext(arr);
    if (next) {
      pre.next = next;
      pre = pre.next;
      // tag = false;
    } else {
      tag = false;
    }
  }
  return result.next;
};

function haveNext(arr) {
  let min = null;
  let pos = -1;
  let result;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      if (pos === -1 || arr[i].val < min) {
        pos = i;
        min = arr[i].val
      }
    }
  }
  if (pos !== -1) {
    result = arr[pos];
    arr[pos] = arr[pos].next;
  }
  return result;
}

// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]

var lists = [
  {
  val:1,
  next: {
    val: 4,
    next: {
      val:5,
      next: null
    }
  }
},
{
  val:1,
  next: {
    val: 3,
    next: {
      val:4,
      next: null
    }
  }
},
{
  val:2,
  next: {
    val: 6,
    next: null
    }
  },
]

console.log(mergeKLists(lists))