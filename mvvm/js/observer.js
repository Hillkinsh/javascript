class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
  }
  walk (data) {
    // 对data中所有属性的劫持，
    // 在劫持后做了哪些事情？
    // 1.get .addDep(this);
    // 2.set sub.update();
    Object.keys(data).forEach(key => {
      this.convert(key, data[key]);
    })
  }
  convert (key, val) {
    this.defineReactive(this.data, key, val)
  }
  defineReactive (data, key, val) {
    var dep = new Dep()
    var childObj = observe(val)

    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            console.log('dep target', Dep.target)
            if (Dep.target) {
                dep.depend(); // TODO:  watcher 那边了
            }
            return val;
        },
        set: function(newVal) {
            if (newVal === val) {
                return
            }
            val = newVal
            // 新的值是object的话，进行监听
            childObj = observe(newVal);
            // 通知订阅者
            dep.notify() // TODO: 调用的update应该也是watcher的
        }
    });
  }
}

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
      return;
  }

  return new Observer(value);
};


var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub: function(sub) {
      this.subs.push(sub);
  },
  // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
  depend: function() {
      Dep.target.addDep(this);
  },

  notify: function() {
      this.subs.forEach(function(sub) {
          sub.update();
      });
  }
};

Dep.target = null;