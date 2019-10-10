class Watcher {
    constructor(vm, expOrFn, cb) {
      this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
      this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
      this.cb = cb; // 当数据更新时想要做的事情 数据更新触发的回调
      this.expOrFn = expOrFn; // 被订阅的数据 word
      this.val = this.get() // 维护更新之前的数据
      // 拿到对应的数据。
    }
    // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
    update() {
      // 先取一次data属性的值，放在val。
      // this.val 是初始化时放进来的
      // 如果不同，调用，编译时传进来的那个方法。
      // 这个方法的作用是：变更元素节点/文本节点响应的值。
      // 变更后，视图刷新，如何实现的
      // 每个可能需要的刷新的节点上，都做了一个watcher。在相应的值变更后，
      // 会触发触发所有相关的订阅
      const val = this.get()
      console.log('watcher here')
      if (val !== this.val) {
        console.log('watcher here, inner ')
        this.val = val;
        this.cb.call(this.vm, val);
      }
    }
    addDep(dep) {
      // 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
      // 此判断是避免同id的Watcher被多次储存
      if (!this.depIds.hasOwnProperty(dep.id)) {
        // console.log('---I will add sub. ---', dep)
        dep.addSub(this)
        this.depIds[dep.id] = dep
      }
    }
    get() {
      // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
      Dep.target = this
      // 此时访问this.vm._data, 触发该属性的get劫持
      const val = this.vm._data[this.expOrFn]
      // 置空，用于下一个Watcher使用
      Dep.target = null
      return val
    }
  }
