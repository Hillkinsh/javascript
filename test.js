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

function color (rgy) {
  console.log(rgy)
}

function sleep (duration) {
  return new Promise( function (resolve, reject) {
    setTimeout(resolve, duration)
  })
}

async function foo () {
  while(1) {
    await sleep(3000)
    color('green')
    await sleep(1000)
    color('yellow')
    await sleep(2000)
    color('red')
  }
}

function recur () {
  let colorArr = ['green','yellow', 'red']
  return function transLight (color) {
    let sleepObj
    if (typeof color == 'string') {
      sleepObj = sleep(colorArr.indexOf(color)*1000)
    } else {
      sleepObj = sleep('green')
    }
    sleepObj.then(transLight('yellow'))
  }
  
}

let Task = {
  setId: function (id) {this.id = id},
  outputId: function () {console.log(this.id)}
}

// 让xyz 委托task
XYZ = Object.create(Task)
XYZ.prepareTask = function(id, label) {
  this.setId(id)
  this.label = label
}
XYZ.outputTaskDetails = function() {
  this.outputId()
  console.log(this.label)
}

function Foo(who) {
  this.me = who
}
Foo.prototype.identify = function () {
  return 'I am ' + this.me
}
function Bar (who) {
  Foo.call(this, who)
}
Bar.prototype = Object.create(Foo.prototype)
Bar.prototype.speak = function () {
  alert('hello ' + this.identify() + ' .')
}

var b1 = new Bar('b1')
var b2 = new Bar('b2')
b1.speak()
b2.speak()

Foo = {
  init: function (who) {
    this.me = who
  },
  identify: function () {
    return 'I am ' + this.me
  }
}
Bar = Object.create(Foo)
Bar.speak = function () {
  alert('hello ' + this.identify() + ' .')
}
var b1 = Object.create(Bar)
b1.init('b1')
var b2 = Object.create(Bar)
b2.init('b2')

b1.speak()
b2.speak()


let str = 'hello'
let iter = str[Symbol.iterator]()
iter.next()  // {value: 'h', done: false}
iter.next()  // {value: 'e', done: false}
iter.next()  // {value: 'l', done: false}
iter.next()  // {value: 'l', done: false}
iter.next()  // {value: 'o', done: false}
iter.next()  // {value: undefined, done: true}

let obj = {
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return {
          next:1, 
          done:true
        }
      }
    }
  }
}

let arr = [1,2,3,4,5]
let iter = arr[Symbol.iterator]()
iter.next()

let set = new Set([1,2,3,4,5])
let setIter = set[Symbol.iterator]()

let map = new Map()
map.set({a:1}, 'hello')
map.set({a:2}, 'hi')
let mapIter = map[Symbol.iterator]()


// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

function *sleep () {
  for(let time=0; true; time++) {
    let light = ['red', 'yellow', 'green'][time%3] 
    yield console.log(light)  
  }
}

u = sleep()
u.next(1)
u.next(2)
u.next(3)

function trans() {
  setTimeout(u.next(), 1000)
}

function *f () {
  for (let i=0; true; i++) {
    let reset = yield i
    if (reset) {
      i = -1
    }
  }
}
let g = f()