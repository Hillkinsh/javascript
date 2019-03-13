>构造函数和实例之间的[[prototype]]机制实际上就是指对象中的内部链接引用另一个对象。
>换句话说，这个机制的本质是对象之间的关联关系

### 那么委托又是什么呢。
看下面的例子：

```
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
```

上面代码中，Task和XYZ不是类，而是对象。XYZ通过Object.create创建。他的[[prototype]]委托给了Task对象。
```
  代码中，id和label数据成员都直接存储在XYZ对象中。
  上面XYZ在调用prepareTask时，首先查找XYZ中是否有this.setId ，因此会通过[[prototype]]委托关联到的Task 上继续寻找。
```

### 委托和类的对比
```
类（构造函数）实现
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
```

```
委托实现
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
```

实现结构对比如下：
![构造函数](https://github.com/Hillkinsh/javascript/blob/master/image/function.png)
![委托机制](https://github.com/Hillkinsh/javascript/blob/master/image/weituo.png)
所以委托的好处就体现出来了，清晰、简洁、实用。