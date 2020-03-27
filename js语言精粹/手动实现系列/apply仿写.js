Function.prototype.myapply = function (context, args) {
  let ctx = context || window
  let params = !args || !args.length ? []: args
  ctx.fn = this
  let result = ctx.fn(params)
  delete ctx.fn
  return result
} 

function a () {console.log(this)}

a.apply({a:1}, [1,2,2])
a.myapply({a:1}, [1,2,2]) // this上会加一个fn方法