/**
 * 节流
 */

function throttle(fn, time = 10) {
  console.log(time)
  return (...args) => {
    if (throttle.timer) {
      return
    } else {
      console.log(time)
      throttle.timer = setTimeout(() => {
        fn.call(this, ...args)
        throttle.timer = null
      }, time)
    }
  }
}

window.onresize = throttle(() => {
  console.log('hahahaha')
}, 10000)