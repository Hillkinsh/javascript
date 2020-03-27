Function.prototype.mycall = function (context) {
  var ctx = context || window
  ctx.fn = this
  let result = ctx.fn(...[arguments].slice(1))
  delete ctx.fn
  return result
}

function a () {console.log(this)}

a.call({a:1})
a.mycall({a:1}) // this上会加一个fn方法