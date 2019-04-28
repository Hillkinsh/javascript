// 预处理和指令序言
// 1.var
var a = 1
let b = 2
const c = 3
function test () {
  console.log(a)
  var a = 2
}
function test2 () {
  console.log(a)
  if (false) {
    var a = 2
  }
  
}
// test() // undefined
// test2() // undefined

// var 声明永远作用于脚本、模块和函数体这个级别，在预处理阶段，不关心赋值的部分，
// 只管在当前作用域声明这个变量。

// 2. function
// function声明的行为和var非常类似，但最新的js标准中，做了修改。
// 他和var的区别是 function声明不但在作用域中加入变量，还会给其赋值。

// console.log(ha())  // 1
function ha () {
  return 1
}
// console.log(ha2) // undefined
if (false) {
  function ha2 () {
    return 2
  }
}
// 但在if等语句中，则会只引入变量，而没有赋值。
// 要不要这么乱啊，谁能记得住？？？


// 3. class let const 
// 新出现的这三个也有预处理，他会在作用域中创建变量。并且在要求访问时抛出错误。

// console.log(cl) // 引用错误，未定义。
class cl { }

function testclass () {
  console.log(cl) // ok
  console.log(cl2)  // 引用错误
  if (true) {
    class cl2 {}
  }
}

// testclass()
// 执行后，我们看到仍然抛出错误，如果去掉class声明cl2，就会像cl一样，正常打印。
// 也就是说，出现在后面的class声明影响了前面语法的结果。


// 总结一下： 3种情况：
// 1. var 穿透一切，违反直觉。属于公认设计失误。
// 2. function 修正过一版，变成声明加赋值，但在if等情况下会被打回原形
// 3. class let const 也存在预处理，预处理的结果是报错。