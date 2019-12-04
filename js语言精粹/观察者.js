class Watcher {
  handles = {}
  on(type, handle) {
    this.handles[type] ?
      this.handles[type].push(handle) :
      this.handles[type] = [handle]
  }
  off(type, handle) { // 不传默认全组删除，传了删掉对应的函数
    let handles = this.handles[type]
    if (handles) {
      if (!handle) {
        handles.length = 0
      } else {
        for (let i = 0; i < handles.length; i++) {
          let tempFn = handles[i]
          if (tempFn === handle) {
            handles.splice(i, 1)
          }
        }
      }
    }
  }
  once(type, handle) {
    let func = (...args) => {
      handle.apply(this, args)
      this.off(type, func)
    }
    this.on(type, func)
  }
  emit(...args) { // 参数的处理
    let events = this.handles[args[0]]
    if (events) {
      events.forEach(element => {
        element.apply(this, args.slice(1))
      });
    }
  }
}

var event = new Watcher()

function a(something) {
  console.log(something, 'aa-aa')
}

function b(something) {
  console.log(something)
}
event.once('dosomething', a)
event.emit('dosomething', 'chifan')
event.emit('dosomething', 'chifan')

// console.log(event)
//event.emit('dosomething')

// event.on('dosomething', a)
// event.on('dosomething', b)
// event.emit('dosomething', 'chifan')
// event.off('dosomething', a)
// console.log('dosomething---------chifan')
// event.emit('dosomething', 'chifan')
// setTimeout(() => {
//   event.emit('dosomething','hejiu')
// },2000)