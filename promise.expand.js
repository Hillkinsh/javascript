// promise扩展
// 可取消的promise
// 借助 Promise.race() 方法

//传入一个正在执行的promise
function getPromiseWithAbort(p){
  let obj = {
    abort: null,
    promise: null
  };
  //内部定一个新的promise，用来终止执行
  let p1 = new Promise(function(resolve, reject){
      obj.abort = resolve;
  });
  obj.promise = Promise.race([p, p1]);
  return obj;
}

var promise  = new Promise((resolve) => {
  setTimeout(() => {
   resolve('123');
  }, 3000);
 })
 
 var obj = getPromiseWithAbort(promise)
 
 obj.promise.then(res => {
   console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
 
 //如果要取消
 obj.abort('取消执行');
 