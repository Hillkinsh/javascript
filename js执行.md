### 宏观任务和微观任务

> 当拿到一段JavaScript代码时，浏览器或者node引擎首先要做的就是：把js代码传递给js引擎，并且要求他去执行。
> 在早期的ES版本中（ES3之前），js本身没有异步执行代码的能力，也就是说，宿主环境传递给js引擎一段代码，引擎就把代码顺次执行了。这个任务时宿主发起的任务。 
> 而在es5之后，js中引入了promise。这样不需要浏览器的安排，js引擎本身也可以发起任务了。
> 
> 在JSC引擎中，宿主发起的任务叫宏观任务，js引擎发起的任务叫微观任务。

在宏观任务中，js的promise还会产生异步代码，js必须保证这些异步代码必须在一个宏观任务中完成。因此每个宏观任务又包含了一个微观任务队列。

![宏观和微观任务队列](https://github.com/Hillkinsh/javascript/blob/master/image/weiguan.png)

### 异步执行顺序
1. 分析有多少个宏观任务。
2. 每个宏任务有多少个微任务
3. 确定宏任务中微任务的执行顺序
4. 确定宏任务的执行顺序

### 举例：
```
    function sleep(duration) {
        return new Promise(function(resolve, reject) {
            console.log("b");
            setTimeout(resolve,duration);
        })
    }
    console.log("a");
    sleep(5000).then(()=>console.log("c"));

```
> setTimeout将代码分割成2个宏任务。
> 第一个宏任务包含了console.log('a') console.log('b')
> 第二个宏任务执行 执行调用了resolve，然后then中的代码异步执行得到 console.log('c')
> 因此输出顺序：a b c

### 举例2:
```
    setTimeout(() => console.log("第一个setTimeout"), 0)

    var r = new Promise(function(resolve, reject) {
        resolve()
    });

    r.then(() => { 
       setTimeout(function () {
           console.log('第二个setTimeout ')
       }, 0)

        console.log("c1") 

        new Promise(function(resolve, reject) {
            setTimeout(resolve(), 1000)
        }).then(() => console.log("微观任务"))
    });

```
这个的输出顺序是：c1, 微观任务，第一个setTimeout， 第二个setTimeout