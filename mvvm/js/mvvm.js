class MVVM {
  constructor(options) {
    this.$options = options || {}
    let data = this._data = this.$options.data

    Object.keys(data).forEach((key) => {
      this._proxyData(key)
    })
    observe(data) // 劫持监听值得变化.对所有属性进行劫持，每一个属性做一个发布订阅

    new Compile(options.el || document.body, this)
  }

  // 将data属性全都代理到vue实例属性上，只有get/set方法用于读取和修改data
  // 而observe 又代理一层
  _proxyData(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      get: () => {
        // 数据初始化的时候，用了一下后面没有用到
        console.log('get')
        return this._data[key]
      },
      set: (newVal) => {
        console.log('set')
        // 每次更新，其实改的是他
        // 修改的操作是： this.word = 'new value'
        // 上面这样，值改变的时候， 同时修改this._data
        this._data[key] = newVal
      }
    })
  }
}