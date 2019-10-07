class MVVM {
  constructor (options) {
    this.$options = options || {}

    var data = this._data = this.$options.data

    Object.keys(data).forEach((key) => {
      this._proxyData(key)
    })
    observe(data, this) // 劫持监听值得变化

    new Compile(options.el || document.body, this)
  }

  _proxyData (key) { // 将data属性全都代理到vue实例属性上
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get:  () => {
        console.log('get', this._data[key])
        return this._data[key];
      },
      set: (newVal) => {
        console.log('set', newVal)
        this._data[key] = newVal;
      }
    })
  }
}