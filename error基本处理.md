# 3种常见的错误类型及避免方式

## 错误类型

```

    1. 类型转换错误， 2，数据类型错误， 3. 通信错误
```

### 1. 类型转换错误

1. 相同比较时，使用全等操作符

```
   alert('5' == 5) // true
   alert('5' === 5) // false
   alert('1' == true) // true
   alert('1' === true) // false

```
数据基本类型有一张隐式类型转换的表格。记住表格当然可以减少出错。但直接使用全等，就能直接避免类型转换。

2. 控制流语句

```
    function concat(str1, str2, str3) {
        var result = str1 + str2
        if (str3) { // 绝对不要这样
            result += str3
        }
        return result
    }
```

上面这种写法是我最常的写法。
首先函数的用意是拼接两或三个字符串，然后返回拼接结果。 其中，第三个是可选的, 因此必须要检查。
str3，并不是只有undefined才会转成false，0， ''，都会转成false

注意： 在控制流中使用非布尔值，是极为常见的错误来源。一定要注意。

避免方式就是：
在此处传入布尔值。
```
    function concat(str1, str2, str3) {
        var result = str1 + str2
        if (typeof str3 == 'string' ) { 
            result += str3
        }
        return result
    }
```

todo: haolema
