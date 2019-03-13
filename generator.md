### 1. 遍历器 iterator

> 遍历器是一种数据结构的遍历机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（依次处理该数据结构的全部成员）。
> ES6创建了新的遍历命令 for...of 循环，iterator主要供for...of 使用。

#### 遍历过程
1. 创建一个指针对象，指向当前数据结构的起始位置。
2. 调用指针对象的next方法，就将指针指向一个数据成员。具体来说就是返回一个对象: {value: 'someValue', done: false}  value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

#### 例子
```
let str = 'hello'
let iter = str[Symbol.iterator]()
iter.next()  // {value: 'h', done: false}
iter.next()  // {value: 'e', done: false}
iter.next()  // {value: 'l', done: false}
iter.next()  // {value: 'l', done: false}
iter.next()  // {value: 'o', done: false}
iter.next()  // {value: undefined, done: true}
```

### 2. Iterator 接口部署
> 一种数据结构只要部署了Iterator，我们就称该数据结构是可遍历的。
> ES6规定，默认的Iterator接口部署在[Symbol.iterator]属性，


**举例**
```
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

尽管和上面例子的效果不同，但根据‘鸭子’模型，这就是可遍历的。
```

### 3.原生具备遍历属性的数据结构
如下；

1. string
2. array
3. set
4. map
5. 以及：TypedArray； 函数的 arguments 对象；  NodeList 对象

例子：
 ```
 1. 数组
 let arr = [1,2,3,4,5]
let iter = arr[Symbol.iterator]()
iter.next()

2. set
let set = new Set([1,2,3,4,5])
let setIter = set[Symbol.iterator]()

3. map
let map = new Map()
map.set({a:1}, 'hello')
map.set({a:2}, 'hi')
let mapIter = map[Symbol.iterator]()

 ```

