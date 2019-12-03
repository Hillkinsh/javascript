// get 
let obj = {
  name: 'xiaomign',
  age: 27,
  get baz() {
    return this.age * 2
  }
}
let ctx = {
  name: 'ctx',
  age: 28,
  get baz() {
    return this.age * 2
  }
}
// console.log(Reflect.get(obj, 'baz', ctx))

// event.once('dosomething', a)
// event.emit('dosomething', 'chifan')
// event.emit('dosomething', 'chifan')

// console.log(event)
//event.emit('dosomething')

// event.on('dosomething', a)
// event.on('dosomething', b)
// event.emit('dosomething', 'chifan')
// event.off('dosomething', a)
// console.log('dosomething---------chifan')
// event.emit('dosomething', 'chifan')
// setTimeout(() => {
//   event.emit('dosomething','hejiu')
// },2000)

let event = new Proxy({
  on(...args) {
    console.log(args)
  },
  off() {},
  once() {},
  emit() {}
}, {
  get(target, key, receiver) {
    switch (key) {
      case 'on':
        console.log('on');
        break;
      case 'off':
        console.log('off');
        break;
      case 'emit':
        console.log('emit');
        break;
      case 'once':
        console.log('once');
        break;
    }
    return Reflect.get(target, key, receiver)
  }
})

event.once('dosomething')
event.emit('dosomething', 'chifan')
event.on('dosomething', 'chifan')
event.off('dosomething', 'chifan')