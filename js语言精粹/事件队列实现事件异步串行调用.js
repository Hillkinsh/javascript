function LazyMan(name) {
  console.log('Hi! This is ' + name + '!')
  this.task = []
  setTimeout(() => this.next(), 0)
  return this
}
LazyMan.prototype.sleep = function (time) {
  let fn = _ => {
    setTimeout(() => this.next(), time * 1000)
  }
  this.task.push(fn)
  return this
}
LazyMan.prototype.eat = function (food) {
  let fn = _ => {
    console.log('Eat ' + food + '~')
    this.next()
  }
  this.task.push(fn)
  return this
}
LazyMan.prototype.next = function () {
  let fn = this.task.shift()
  fn && fn()
}

new LazyMan("Hank")
  .sleep(2)
  .eat("dinner")
  .eat("dinner")
  .eat("dinner")