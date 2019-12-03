class Observer {
  constructor(data) {
    this.data = data
    console.log('set observe. ', data)
    this.walk(data)
  }
  walk(data) {
    // 对data中所有属性的劫持，
    // 在劫持后做了哪些事情？
    // 1.get .addDep(this);
    // 2.set sub.update();
    Object.keys(data).forEach(key => {
      this.defineReactive(this.data, key, data[key])
    })
  }
  defineReactive(data, key, val) {
    var dep = new Dep()
    var childObj = observe(val)

    Object.defineProperty(data, key, {
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