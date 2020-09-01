/**
 * 本文档存在的原因是熟悉emmiter的基本使用方法，而不是去深究这个事件发生器的源码实现。
 * 因为这个东西是koa的依赖。
 */

let events = require('events');
let eventEmitter = new events.EventEmitter();

// 添加监听 on addListener
// 触发监听 emit
// 移除监听 removeListener

function listen1 () {
  console.log('listener 1. ')
}

function listen2 () {
  console.log('listener 2.')
}

eventEmitter.addListener('connection', listen1);
eventEmitter.on('connection', listen2);

let eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners)
eventEmitter.emit('connection');
eventEmitter.removeListener('connection', listen1);
console.log(eventEmitter.listenerCount('connection'))
