let Dep = require('./dep').Dep
let observe = require('./index')
console.log(observe)
var Observer = function Observer(value) {
  console.log('hahah')
  this.value = value;
  this.dep = new Dep();
  this.walk(value);
};

Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

function defineReactive$$1(
  obj,
  key,
  val
) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = '' //observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('访问getter啦')
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      console.log('data更新啦')
      var value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = '' // observe(newVal);
      dep.notify();
    }
  });
}

module.exports = Observer