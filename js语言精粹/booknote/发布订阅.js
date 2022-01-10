
class PubSub {
  constructor () {
    this.list = {};
  }
  on (key, fn) {
    if (!this.list[key]) {
      this.list[key] = new Array();
    }
    this.list[key].push(fn);
  }
  off (key, fn) {
    if (!this.list[key]) {
      return;
    }
    if (!fn) {
      this.list[key].length = 0;
    }
    const fnList = this.list[key];
    for (let i = 0; i < fnList.length; i++) {
      if (fn === fnList[i]) {
        fnList.splice(i, 1);
      }
    }
  }
  emit(key, ...arg) {
    if (this.list[key]) {
      for (let i = 0; i < this.list[key].length; i++) {
        this.list[key][i].call(this, ...arg);
      }
    }
  }
  once(key, fn) {
    const wrapFn = (...args) => {
      this.off(key, wrapFn);
      fn.apply(this,args);
    }
    this.on(key, wrapFn);
  }
}

let pubsub = new PubSub();
pubsub.on("eat", time => console.log(`eat at ${time}`))
pubsub.on("work", time => console.log(`work at ${time}`))
pubsub.on("offwork", time => console.log(`offwork at ${time}`))
pubsub.once("wc", time => console.log(`wc at ${time}`))

pubsub.emit('eat', '7.10')
pubsub.emit('work', '8.10')
pubsub.emit('offwork', '21.10')
pubsub.emit('wc', '21.10')
pubsub.emit('wc', '21.11')

pubsub.off('work')

pubsub.emit('eat', '7.10')
pubsub.emit('work', '8.10')
pubsub.emit('offwork', '21.10')