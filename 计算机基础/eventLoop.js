async function async1(){
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2(){
  console.log('async2')
}
console.log('script start')
setTimeout(function(){
  console.log('setTimeout') 
},0)  

async1();
new Promise(function(resolve){
  console.log('promise1')
  resolve();
}).then(function(){
  console.log('promise2')
})
console.log('script end')

/**
 * 1.script start
 * async1 start
 * async2
 * promise1
 * script end
 * async1 end
  * promise2
  * setTimeout
 * 
 * 
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
 */


 /**
  * async1 end
  * promise2
  */

// 主要是对async / await机制不了解
async function f(){
  await p
  console.log(1);
}
//node.js8及即将推广的标准应该会解析成下面这样
function f(){
  Promise.resolve(p).then(()=>{
    console.log(1)
  })
}
