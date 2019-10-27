// 1. 柯力化 
// 给函数传一部分参数，让他返回函数处理剩下的参数。
// 实现：


function add (x, y, z) {
  return x + y + z
}

function curry2 (fn) {
  let arr = []
  let length = fn.length
  return function curryFn () {
    arr = arr.concat(Array.prototype.slice.call(arguments))
    if (arr.length == length) {
      return fn.apply(null, arr)
    }
    if (arr.length > length) {
      throw Error('params exceeds.')
    }
    return curryFn
  }
}
console.log(curry2(add)(2)(3)(4))

// 2.发布订阅

class EventEmitter {
    constructor () {
        this._eventpool = {};
    }
    on (event, cb) {
        this._eventpool[event]
          ? this._eventpool[event].push(cb)
          : this._eventpool[event] = [cb]
    }
    emit (event, ...args) {
        this._eventpool[event]
          && this._eventpool[event].forEach(cb => cb(...args))
    }
    off (event) {
        if (this._eventpool[event]) {
            delete this._eventpool[event]
        }
    }
    once (event, callback) {
        this.on(event, (...args) => {
            callback(...args);
            this.off(event)
        })
    }
}

// 防抖,
// 剧烈抖动后，最后一次的某个间隔后执行回调

// 节流是，一定频率的回调执行
let timer 
function debounce (fn, time) {
  clearTimeout(timer)
  timer = setTimeout( _ => {
    fn()
  }, time)
}
function debounce2 (fn, time) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout( _ => {
      fn()
    }, time)
  }
}

// reduce
let arr = [1,2,3,4,5]
let sum = (total, current) => total += current
arr.reduce(sum, 0)

// > js支持给基本类型添加方法。通过给基本类型添加方法，可以极大的提高语言的表现力。

Function.prototype.method = function (name ,fn) {
    console.log(this)
    this.prototype[name] = fn
    return this
}
// this指向实例化的那个对象

// > 给Function 的原型上添加method方法。
// > 那么所有的Function实例都会有此方法。
// 方法里面的this指向实例对象。
// 也就是会在实例对象的proptotype上增加一个方法
// > 
//  **例子验证:**

// ```
let fo = new Function()
fo.__proto__.method == Function.prototype.method  // true. 原型方法验证
fo.method() === fo   // this指向实例对象
fo.prototype
// ```

// * 方法的作用是给当前方法的上下文的原型里增加一个方法。


//  **在Number上的调用**

Number.method('integer', function () {
    return Math[this<0? 'ceil':'floor'](this)
})
// 根本层是 Function
// 在上面添加了原型方法，那么实例上就会有这个方法。


//  因为Number也是Function的实例，因此，可以调用method方法。
//  上述调用后，会给Number的原型对象上添加一个integer方法。
//  方法传递的函数里面的this指向调用对象。
//  因此可以支撑如下的方法调用。
// ```
(1.1).integer()  // 1
// ```
//  上述首先 (1.1)是Number的实例，所以 (1.1).__proto__integer === Number.prototype.integer

//  所以上述方法的作用是，调用方法，就会给自己的原型对象上添加方法。
 

// ## 明白了原理之后，我们也可以这么加：
// ```
Number.prototype.integer = function () {
    return Math[this<0? 'ceil':'floor'](this)
}
let fo = new Function() 
// ```
// 当然从效果上看还是麻烦了一些。

// display: inline block inline-block.

// [1, 2, 3, 4, 5]中找出和为6的两个元素
function getTargetArr (arr, target) {
  let tempObj = {}
  let result = []
  arr.forEach((item, idx) => {
    if (tempObj[target - item] != undefined) {
      result.push([target - item, item])
    }else {
      tempObj[item] = idx
    }
  })

  return result
}

console.log(getTargetArr([1,2,3,4,5], 6))

function quick_sort(arr, start, end) {
  if (start >= end) {
    return
  }
  let mid = arr[start]
  let low = start
  let high = end

  while (low < high) {
    while (low < high && arr[high] >= mid) { // 大的放右边
      high--
    }
    arr[low] = arr[high]
    while (low < high && arr[low] < mid) { // 晓得放左边
      low++
    }
    arr[high] = arr[low]
  }
  arr[low] = mid 
  quick_sort(arr, start, low - 1) 
  quick_sort(arr, low + 1, end)
}

let arr = [7, 4, 3, 67, 34, 1, 8]
quick_sort(arr, 0, arr.length - 1) // [ 1, 3, 4, 7, 8, 34, 67 ]


let dict = [1,2,3,4,5]
let target = '2 3 4 6'
function isAllin (dict, target) {
  let dict_set = new Set(dict)
  let target_set = new Set(target.split(' '))
  let result = [...target_set].filter(i => {dict_set.has(i)})
  return result.length === [...target_set].length
}
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}