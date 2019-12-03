class MVVM {
  constructor(options) {
    this.$options = options || {}
    var data =
      this._data = this.$options.data
    Object.keys(data).forEach((key) => {
      this._proxyData(key)
    })

    observe(data, this) // 劫持监听值得变化

    new Compile(options.el || document.body, this)
  }

  _proxyData(key) { // 将data属性全都代理到vue实例属性上
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get: () => {
        // 数据初始化的时候，用了一下后面没有用到
        return this._data[key]
      },
      set: (newVal) => {
        // 每次更新，其实改的是他
        // 修改的操作是： this.word = 'new value'
        // 上面这样，值改变的时候， 同时修改this._data
        console.log('set')
        this._data[key] = newVal
      }
    })
  }
}