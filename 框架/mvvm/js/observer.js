class Observer {
  constructor(data) { // 这个是监听的那个data对象
    this.data = data
    this.walk(this.data)
  }
  walk(data) {
    // 对data中所有属性的劫持，
    // mvvm 是对vue实例上的data属性都做了监听

    // 在劫持后做了哪些事情？
    // 1.get .addDep(this);
    // 2.set sub.update();
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, val) {
    var dep = new Dep()
    var childObj = observe(val)

    Object.defineProperty(this.data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {
        if (Dep.target) {
          dep.depend()
        }
        return val
      },
      set: function (newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知订阅者
        dep.notify()
      }
    });
  }
}

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)
};


var uid = 0
class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
  depend() {
    Dep.target.addDep(this)
  }
  notify() {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  }
  static target = null
}