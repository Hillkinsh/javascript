class Pb {
  constructor () {
    this.list = {};
  }
  on(key, fn) {
    if (!this.list[key]) {
      this.list[key] = new Array();
    }
    this.list[key].push(fn);
  }
  off(key, fn) {
    const targetArr = this.list[key];
    if (!key) return false;
    if (!fn) this.list[key] && this.list[key].length = 0;
    for (let i = 0; i < targetArr.length; i++) {
      if (targetArr[i] === fn) {
        targetArr.splice(i, 1);
      }
    }
  }
  emit(key, ...args) {
    const targetArr = this.list[key];
    if (targetArr) {
      for (let i = 0; i < targetArr.length; i++) {
        targetArr[i].apply(this, args);
      }
    }
  }
  once(key, fn) {
    const wrap = (...args) => {
      this.off(key, wrap);
      fn.apply(this, args);
    }
    this.on(key, wrap);
  }
}