// 什么是跨域
// 默认情况下，XHR对象只能访问与包含他的页面位于同一个域的资源。
// 而跨域就是请求位于别的域下面的资源。

//jsonp

function jsonp(url){
  return new Promise(function(resolve, cancel){
    
    let callbackFn = function(data) {
      document.body.removeChild(script)
      resolve(data)
    }
    var script = document.createElement('script')
    script.setAttribute('async','async')
    script.src = url + '?callback=callbackFn'  // 这里处理的并不严谨。但原理已经很清晰的展示出来了
    script.onerror = function(e) {
      reject(e)
    }
    document.body.appendChild(script)
  })
}
