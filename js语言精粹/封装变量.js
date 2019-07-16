// 代码优化中，对于一个可变的数据，只要他的作用域超过单个函数，就应该将其封装起来，只允许通过函数访问。
// 用函数封装数据，在代码重构时，特别方便。

let defaultOwner = {firstName: 'martin', lastName: 'fower'}
// 使用
spaceship.owner = defaultOwner
// 修改
defaultOwner = {firstName: 'babara', lastName: 'ocally'}

// 定义读取和写入函数，做基础封装
// 禁止对数据结构内部数值做任何修改，每次获取只返回一个副本。那么客户端就可以任意的修改他，而不用担心影响到共享数据
function getDefaultOwner () {
    return Object.assign({}, defaultOwner)
}
function setDefaultOwner (arg) {
    defaultOwner = arg
}

