
## this隐式和显式绑定

### 1 隐式绑定this

+ this指向函数调用的那个对象
```
    const user = {
        name: 'Tyler',
        age: 27,
        greet () {
            console.log(this)
        }
    }

    user.greet() // user
    let gre = user.greet
    gre() // window
```

## 2 显式绑定this
### 2.1 call(context, param1, param2, ...)

```
    const user = {
    name: 'Tyler',
    age: 27,
    greet () {
        console.log(this)
    }
    }
    const bus = {
    name:'xiaobia',
    age: 28,
    }

    user.greet.call(user) // user
    user.greet.call(null) // window
    user.greet.call(undefined) // window
    user.greet.call(type) // 其他的基本类型都是装箱转换的对象。
```

+ 参数
```
user.greet.call(user, 'nihaoa,', 'a' , 'b') // user
```

+ apply 仅参数格式和call不同，
```
   user.greet.call(user, ['nihaoa,', 'a' , 'b']) // user
```

### 2.2 bind

+ 和call完全相同，只是不会立即调用函数。
``` 
    let greet = user.greet.bind(user, 'nihaoa,', 'a' , 'b') // 可以
    greet() 

    let greet2 = user.greet.bind(user)
    greet2('nihaoa,', 'a' , 'b')

    let greet3 = user.greet.bind(user, 'nihaoa')
    greet3('a' , 'b')
```

### 2.3 new 绑定

+ 用new调用一个函数，this会指向创建的对象。



## 应用：实现一个bind--实现倒也简单，就是应用一下apply即可。
      ```
        function bind(fn,obj){
            return function(){
                return fn.apply(obj,arguments);
            }
        }

        var a = function(){return this.b};
        var obj = {
            a:1,
            b:'11'
        }
        var abind = bind(a,obj);
        console.log(abind());//11
    ```