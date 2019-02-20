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

var addTwoNumbers = function(l1, l2) {
  let arr = []
  while(l1.next) {
      arr.push(l1.val + l2.val)
      l1 = l1.next
      l2 = l2.next
  }
  let temp = 0;
  for (let i =0 ; i< arr.length; i++) {
      temp = temp + arr[i]*Math.pow(10, arr.length - i - 1)
  }
  let out = {}
  temp = temp.toString().split('').reverse()
  return createList(temp)
};

function createList(temp) {
  if (!temp.length) return null
  
  return {
      val: temp[0]-0,
      next: createList(temp.slice(1))
  }
}

addTwoNumbers(l1, l2)