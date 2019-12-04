// 防抖动
/**
 * 抖动结束后触发事件，
 * 抖动时，不停的清掉异步事件
 */

function debounce(fn, time = 100) {
  return (...args) => {
    clearTimeout(fn.id)
    fn.id = setTimeout(() => {
      fn.call(this, ...args)
    }, time)
  }
}