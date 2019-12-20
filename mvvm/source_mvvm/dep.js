new Vue({
  template: `
  <div>{{text1}}</div>
  <div>{{text2}}</div>
  `,
  data: {
    text1: 123,
    text2: 234,
    text3: 345
  }
})

class Dep {
  subs = []
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(item => {
      item.update()
    })
  }
}

class Watcher {
  constructor() {
    Dep.target = this
  }
  update() {
    console.log('刷新视图')
  }
}
export {
  Dep,
  Watcher
}