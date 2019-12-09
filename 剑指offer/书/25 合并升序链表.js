// 合并2个升序的链表
let list1 = {
  value: 1,
  next: {
    value:3,
    next: {
      value:5,
      next: {
        value: 7,
        next: null
      }
    }
  }
}
let list2 = {
  value: 2,
  next: {
    value:4,
    next: {
      value:6,
      next: {
        value: 8,
        next: null
      }
    }
  }
}
/**
 * 这个方法我为什么想不到呢？
 * 递归很轻巧，而且解决了看似复杂的问题
*/
function mergeList (l1, l2) {
  if (!l1) return l2
  if (!l2) return l1
  let merge = null
  if (l1.value < l2.value) {
    merge = l1
    merge.next = mergeList(l1.next, l2)
  } else {
    merge = l2
    merge.next = mergeList(l1, l2.next)
  }
  return merge
}

console.log(mergeList(list1, list2))