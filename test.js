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

var findTarget2 = function(root, k) {
  let stack = [root]
  
  let map = {}
  
  while (stack.length > 0) {
      let cur = stack.pop()
      console.log(cur.val)
      if (map[k - cur.val]) return true
      map[cur.val] = true;
      
      if (cur.left) stack.push(cur.left)
      if (cur.right) stack.push(cur.right)
  }
  return false
};

findTarget2([5,3,6,2,4,null,7], 9)