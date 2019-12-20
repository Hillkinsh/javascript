import {
  Dep,
  Watcher
} from './dep'

// Object.defineProperty
function cb() {
  console.log('to reflow.')
}

function defineReactive(obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val
    },
    set(newVal) {
      if (newVal === val) {
        return
      } else {
        cb(newVal)
      }
    }
  })
}

function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return;
  }

  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key]);
  });
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
  }
}

let mvvm = new Vue({
  data: {
    a: 1,
    b: 'hello'
  }
})

mvvm._data.b = 'he'

export {
  Vue
}