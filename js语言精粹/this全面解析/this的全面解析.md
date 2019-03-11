> 哈哈。阮一峰对this的理解也是门外汉级别。我真是信了他的邪。
> 糟老头子，坏的很。
> 这里重新从定义上梳理一版。

函数的调用位置是一个基本的定义，具体概念在
[调用位置](https://github.com/Hillkinsh/javascript/blob/master/js%E8%AF%AD%E8%A8%80%E7%B2%BE%E7%B2%B9/this%E5%85%A8%E9%9D%A2%E8%A7%A3%E6%9E%90/%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E4%BD%8D%E7%BD%AE.md)

### this的绑定规则

处理4种情况：
1. 默认绑定
2. 隐式绑定
3. 显式绑定
4. new绑定

#### 1.默认绑定

非严格模式下，this绑定到 **全局对象** 。 非严格模式下，this绑定到 **undefined**

```
  var  fo = function() {console.log(this.a)}
  a = 1
  fo() // 1

  var  fo2 = function() {'use strict'; console.log(this.a)}

  fo2() // Uncaught TypeError: Cannot read property 'a' of undefined
```

#### 2.隐式绑定
> 根据调用位置是否有上下文，来确定隐式绑定。
> 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。

**例子**
```
var obj = {a:1, sayA: function () {console.log(this.a)}}
var a = 2
obj.sayA // 1
```

对于隐式绑定，更出名的是各种隐式丢失问题：也就是他会应用默认绑定。
1. 函数别名

```
var obj = {a:1, sayA: function () {console.log(this.a)}}
var sayA = obj.sayA //  函数别名
sayA // undefined
```
> sayA是obj.sayA 的引用。但引用的只是函数本身，因此调用时，没有调用上下文

2. 函数回调

> 参数传递实际上是另一种隐式赋值。

```
var obj = {a:1, sayA: function () {console.log(this.a)}}
var dofo = function (fn) {fn()}

dofo(obj.sayA) // undefined
```

#### 3. 显示绑定 call ，apply，bind

> 这3个方法的使用就不展开了。可以说是非常熟悉。
> 这里要注意的是，一些三方库的函数，宿主环境的内置函数等，都提供了一个
> **可选的参数**，通常被称为上下文，来确保回调的函数使用指定的 this。

**举例：**
```
    function foo(el) { console.log( el, this.id ); }
    var obj = { id: "awesome" };

    // 调用foo(..) 时把this 绑定到obj

    [1, 2, 3].forEach( foo, obj ); // 1 awesome 2 awesome 3 awesome
```
> 这些函数实际上也是call， apply实现的显示绑定。

#### 4. new 绑定

```
这个也是熟得不能再熟了，不讲了。
```

**this的使用也就是这些了，非常的完备，有人说箭头函数呢。我认为箭头函数那块应该和词法作用域是一家的。放在这里反倒让梳理清晰的this使用变得混乱。**