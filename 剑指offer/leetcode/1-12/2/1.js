// var addTwoNumbers = function (l1, l2) {
//   if (!l1 || !l2) {
//     return JSON.parse(JSON.stringify(l1 || l2))
//   }
//   let result
//   let temp
//   let carry = 0
//   let value = 0
//   while (l1 && l2) {
//     value = l1.val + l2.val + carry
//     carry = value > 9 ? 1 : 0
//     value = value % 10
//     let node = new ListNode(value)
//     if (!result) {
//       temp = node
//       result = temp
//     } else {
//       temp.next = node
//       temp = temp.next
//     }
//     l1 = l1.next
//     l2 = l2.next
//   }
//   let list = l1 || l2
//   while (list) {
//     value = list.val + carry
//     carry = value > 9 ? 1 : 0
//     value = value % 10
//     let node = new ListNode(value)
//     temp.next = node
//     temp = temp.next
//     list = list.next
//   }
//   if (carry) {
//     temp.next = new ListNode(carry)
//   }
//   return result
// }
/**
 * 思路：
 * 把只有单链表的时候赋值一下取出来，这样就少些一个while循环
 */
// (2 -> 4 -> 3) + (5 -> 6 -> 4)




function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
// [9,9,9,9,9,9,9]
// [9,9,9,9]
const l1 = {
  val: 9,
  next: {
    val: 9,
    next: {
      val: 9,
      next: {
        val: 9,
        next: {
          val: 9,
          next: {
            val: 9,
            next: {
              val: 9,
              next: null
            }
          }
        }
      }
    }
  }
};
const l2 = {
  val: 9,
  next: {
    val: 9,
    next: {
      val: 9,
      next: {
        val: 9,
        next: null
      }
    }
  }
};
var addTwoNumbers = function(l1, l2) {
  let chain = new ListNode(0);
  let result = chain;
  let tag = 0;
  let list1 = l1;
  let list2 = l2;
  while (list1 || list2 || tag) {
    const valFn = list1 => list1 && list1.val || 0;
    const val = (tag + valFn(list1) + valFn(list2)) % 10;
    tag = Math.floor((tag + valFn(list1) + valFn(list2)) / 10);
    chain.next = new ListNode(val);
    chain = chain.next;
    list1 = list1 && list1.next;
    list2 = list2 && list2.next;
  }
  return result.next;
};

console.log(addTwoNumbers(l1, l2));