  // 图片懒加载原理上比较好理解。就是当图片出现在图中时，再请求图片让图片返回
  // 这种做法的好处就是，图片可以一张一张的加载。用户体验更棒。
  // 
  // 项目中，实现方式就是给图片img标签，添加一个data-src属性，属性值就是图片的实际地址，src直接略去，
  // 当图片出现在视图框中时，再将src换成图片地址，进行图片的请求。
  // 还可以加上节流，使图片滚动时，性能优化。
  // 以下就是这个实现的核心代码
  // Throttle是节流函数
  // loadImg 是图片加载方法。
  // 两者搭配实现节流的图片懒加载。
  // 我真是太棒了~~~~~

class Throttle {
  constructor() {
      this.timer = false
  }
  init() {
      return function (callback, delay, that) {
          if (this.timer) {
              return false;
          }
          this.timer = true
          callback.call(that)

          setTimeout(() => {
              this.timer = false;
          }, delay)
      }
  }
}
let throttle = (function () {
  let thr = new Throttle()
  thr = thr.init().bind(thr)
  return thr
})()

  
  function _isShow(context, key) {
    let top = context.$refs[key][0].getBoundingClientRect().top,
    bottom = context.$refs[key][0].getBoundingClientRect().bottom,
    screenHeight = window.screen.height
    if (bottom<0 || top > screenHeight*2) {
      return false
    } else {
      return true
    }
  }

  function loadImg() {
    
    let src, datasrc

    for (let key in this.$refs) {
      src = this.$refs[key][0].src
      datasrc = this.$refs[key][0].dataset.src
      if (_isShow(this, key) && !src && datasrc) {
        this.$refs[key][0].src = datasrc
      }
    }
  }



export default {
  throttle,
  loadImg
}