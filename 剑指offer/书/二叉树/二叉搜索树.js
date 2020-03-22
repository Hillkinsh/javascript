/**
 * 节点查询
 * @param {*} head 
 * @param {*} k 
 */
function tree_Search(head, k) {
  if (head == null || k == head.val) {
    return head
  }
  if (k < head.val) {
    return tree_Search(head.left, k)
  } else {
    return tree_Search(head.right, k)
  }
}

function iteractive_tree_search(head, k) {
  while (head !== null && head.val !== k) {
    if (k < head.val) {
      head = head.left
    } else {
      head = head.right
    }
  }
  return head
}

// 最大和最小节点
function tree_minimum(head) {
  while (head.left) {
    head = head.left
  }
  return head
}

function tree_maximum(head) {
  while (head.right) {
    head = head.right
  }
  return head
}

// 按中序遍历返回后继和前驱
// 需要父亲节点

// function tree_successor(head) {
//   if (head.right) {
//     return tree_minimum(head.right)
//   }

// }

// 插入
function tree_insert()
let root = {
  val: 15,
  left: {
    val: 6,
    left: {
      val: 3,
      left: {
        val: 2,
        left: null,
        right: null
      },
      right: {
        val: 4,
        left: null,
        right: null
      }
    },
    right: {
      val: 7,
      right: {
        val: 13,
        left: {
          val: 9,
          left: null,
          right: null
        }
      }
    }
  },
  right: {
    val: 18,
    left: {
      val: 17
    },
    right: {
      val: 20
    }
  }
}

// console.log(iteractive_tree_search(root, 9))
// console.log(iteractive_tree_search(root, 20))
// console.log(iteractive_tree_search(root, 15))
// console.log(iteractive_tree_search(root, 8))
console.log(tree_minimum(root))
console.log(tree_maximum(root))