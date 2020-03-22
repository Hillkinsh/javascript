class Watcher {
  constructor() {
    this.task = {}
  }
  on(type, handler) {
    if (this.task[type]) {
      this.task[type].push(handler)
    } else {
      this.task[type] = [handler]
    }
  }
  off(type, handler) {
    if (!handler) {
      this.task[type] ? this.task[type].length = 0 : ''
    } else {
      if (this.task[type] && this.task[type].length) {
        let pos = -1
        this.task[type].some((item, idx) => {
          if (item == handler) {
            let pos = idx
            return true
          }
        })
        if (pos !== -1) {
          this.task[type].splice(pos, 1)
        }
      }
    }
  }
  emit(...args) {
    let type = args[0]
    let params = args.slice(1)
    if (this.task[type] && this.task[type].length) {
      for (let i = 0; i < this.task[type].length; i++) {
        this.task[type][i](...params)
      }
    }
  }
  once(type, handler) {
    let fn = () => {
      handler.apply(this, ...arguments)
      this.off(type, handler)
    }
    this.on(type, fn)
  }
}