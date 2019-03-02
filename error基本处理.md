# 3种常见的错误类型及避免方式

## 一，错误类型

    1. 类型转换错误， 

    2. 数据类型错误， 

    3. 通信错误


### 1. 类型转换错误

1. 相同比较时，使用全等操作符

```
   alert('5' == 5) // true
   alert('5' === 5) // false
   alert('1' == true) // true
   alert('1' === true) // false

```
数据基本类型有一张隐式类型转换的表格。记住表格当然可以减少出错。但直接使用全等，就能直接避免类型转换可能隐含的错误。

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

上面这种写法也是我最常的写法。

首先函数的用意是拼接两或三个字符串，然后返回拼接结果。 其中，第三个是可选的, 因此必须要检查。

str3，并不是只有undefined才会转成false，0， ''，都会转成false

注意： 在控制流中使用非布尔值，是极为常见的错误来源。一定要注意。

避免方式就是：
**在此处传入布尔值**


```
    function concat(str1, str2, str3) {
        var result = str1 + str2
        if (typeof str3 == 'string' ) { 
            result += str3
        }
        return result
    }
```

### 2. 数据类型错误

js 在使用变量和函数参数之前，不会对他们进行比较以确保他们的数据类型正确。

为了确保不会发生数据类型错误，只能依靠开发人员编写适当的数据类型检测代码。

```
  function getQueryString( str) {
      var pos = str.indexOf('?')
      if (pos > -1) {
          return str.substring(pos + 1)
      }
      return ''
  }
```

这个函数的返回URL中的查询字符串。 例子中使用了 indexOf 和substring 方法来操作字符串。
但如果传值不是字符串，就会报错

解决方式就是:
**添加类型检测语句**

```
    function getQueryString( str) {
        if (typeof url === 'string') {
            var pos = str.indexOf('?')
            if (pos > -1) {
                return str.substring(pos + 1)
            }
        }
        return ''
    }
```

**大体上说，基本类型检测用typeof,对象检测用instanceof(严格检查可以使用{}.toString.call来判断。还有一个函数专门处理这个)**

**根据函数使用的方式，有时候不需要逐个检测所有参数的数据类型，但面向公众的api，则必须无条件检查**

### 3. 通信错误
```
  通信错误，就是使用的URL没有使用encodeURIComponent编码。
  因此对查询字符串一定要编码
```

```
 function addQueryString (url, name, value) {
     if (url.indexOf('?') == -1) {
         url += '?'
     } else {
         url += '&'
     }
     return url + encodeURIComponent(name) + '=' + encodeURIComponent(value)
 }
```

## 二，区分是否是致命错误

```
  1. 非致命错误
    不影响用户主要任务
    只影响页面的一部分
    可以恢复
    重复操作可以消除错误

  2. 致命错误
    应用程序根本无法继续执行
    错误明显影响到了用户的主要操作
    会导致其他连带错误
```
### 处理策略
对于非致命错误，**不打扰用户**

对于致命错误，**立即给用户发送一条消息告诉用户无法继续手头的事情了**