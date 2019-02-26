var twoSum6 = function(nums, target) {
  let obj = {}
  for (let i=0; i<nums.length; i++) {
    let temp = target - nums[i] +''
    if (temp in obj ) {
        return [obj[temp], i]
    } else {
        obj[nums[i]] = i
    }
  }
};

twoSum6([2,7,8,11], 9)

var twoSum = function (arr, target) {
  let map = new Map()
  for(let i=0; i<arr.length; i++) {
    if (map.get(target - arr[i])!=null) {
      return [map.get(target - arr[i])+1, i+1]
    } else {
      map.set(arr[i],i)
    }
  }
}

twoSum([2,7,11,15], 9)

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 * 中序遍历
 */
var findTarget = function(root, k) {
  let map = new Map()
  return find(root, k)

  function find(root, k) {
    if(root.left == null && root.right == null) {
      return false
    } else if (map.get(k-root.val)) {
        return true
    } else {
      map.set(root.val,'')
      root.left && find(root.left, k)
      root.right && find(root.right, k)
    }
  }  
};

let l1 = {
  val:2,
  next: {
    val: 4,
    next : {
      val: 3,
      next: null
    }
  }
},
l2 = {
  val:5,
  next: {
    val:6,
    next:{
      val:4,
      next:null
    }
  }
}

class ListNode {
  constructor (val) {
    this.val = val
    this.next = null
  }
}

// var addTwoNumbers = function(l1, l2) {
//   var sm = 0, dummy = cur = new ListNode(0);
//   while (l1 || l2 || sm){
//       if (l1){sm += l1.val, l1 = l1.next;} 
//       if (l2){sm += l2.val, l2 = l2.next;} 
//       cur = cur.next = new ListNode(sm % 10);
//       if (sm > 9) {sm = 1;} else{sm = 0;}}

//       console.log(dummy)
//   return dummy.next;
// };



function addTwoNumbers (l1, l2) {
  let sum =0;
  let out = list = new ListNode(0)
  while (l1 || l2 || sum) {
    if (l1) {sum = sum + l1.val, l1 = l1.next}
    if (l2) {sum = sum + l2.val, l2 = l2.next}
    list = list.next = new ListNode(sum % 10)
    sum = sum > 9 ? 1:0
  }
  return out.next
}
addTwoNumbers(l1, l2)

function lengthOfLongestSubstring( s) {
  let map = new Map()
  // map.set(256, -1)
  let maxLen = 0, start = -1
  for (let i = 0; i != s.length; i++) {
    if (map.get(s[i])!=undefined && (map.get(s[i]) > start)) {
      start = map.get(s[i])
    }
    map.set(s[i], i)
    maxLen = Math.max(maxLen, i-start)
  }
  console.log(maxLen)
  return maxLen
}

lengthOfLongestSubstring('abcdefgacgd')
lengthOfLongestSubstring('aa')
lengthOfLongestSubstring('abda')