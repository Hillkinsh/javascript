# 事件委托和事件冒泡

## 1.事件流指的是从页面中接受事件的顺序。

事件流的3个阶段：
1。事件捕获阶段
2.处于目标阶段
3.事件冒泡阶段

## 2. 事件处理程序

addEventListener(fn, bool)

true表示捕获，false表示冒泡

removeEventListener()

## 3. 取消默认行为

event.preventDefault()

## 4. 取消进一步的冒泡或捕获

event.stopPropagation()

## 5. 事件委托

利用了冒泡机制，管理某一类型所有的事件。
好处： 
1.性能问题。大量的事件处理程序影响性能
2.新添加元素也会利用事件委托处理事件