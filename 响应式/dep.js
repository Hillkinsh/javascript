// import Watcher from './watcher'

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) { // sub: Watcher
    this.subs.push(sub)
  }
  removeSub(sub) { // sub: Watcher
    remove(this.subs, sub)
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []

function pushTarget(target) { // Watcher
  targetStack.push(target)
  Dep.target = target
}

function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

module.exports = {
  Dep: Dep,
  pushTarget: pushTarget,
  popTarget: popTarget
}