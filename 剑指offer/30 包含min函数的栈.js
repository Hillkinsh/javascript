// 实现一个类，类定义一个栈结构，调用min push pop的时间复杂度都是O(1)
class Astack {
  constructor () {
    this.pool = []
    this.aux = []
  }
  push (ele) {
    this.pool.push(ele)
    let temp = (!this.aux.length || ele < this.aux[this.aux.length - 1])
      ? ele 
      : this.aux[this.aux.length - 1]
    this.aux.push(temp)
  }
  pop () {
    this.aux.pop()
    return this.pool.pop()
  }
  min () {
    return this.aux[this.aux.length - 1]
  }
}

let mys = new Astack()
mys.push(3)
mys.push(4)
mys.push(2)
mys.push(1)
mys.pop()
mys.pop()
mys.push(0)