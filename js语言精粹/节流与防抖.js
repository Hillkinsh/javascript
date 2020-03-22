/**
 * 节流. 限制操作频率
 */
function throttle(fn, time = 10) {
  return (...args) => {
    if (fn.timer) {
      return
    } else {
      fn.timer = setTimeout(() => {
        fn.call(this, ...args)
        fn.timer = null
      }, time)
    }
  }
}

window.onresize = throttle(() => {
  console.log('hahahaha')
}, 10000)

/**
 * 防抖，操作后以一定的时间间隔后触发。
 */

 function debounce (fn, time) {
   clearTimeout(fn.timer)
   fn.timer = setTimeout(() => fn(), time)
 }