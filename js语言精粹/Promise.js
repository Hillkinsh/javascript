// 1. Promise.all() 
// 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数

// 2. Promise.race()
// 有一个改变状态，就改

// 3. .allSettled() ES2020 所有状态改变后返回状态


const first = () => new Promise((resolve, reject) => {
  console.log(3);
  let p = new Promise((resolve, reject) => {
    console.log(7);
    setTimeout(() => {
      console.log(5);
      resolve(6);
    }, 0)
    resolve(1);
  });
  resolve(2);
  // 后面不走了
  p.then((arg) => {
    console.log(arg);
  });

})

first().then((arg) => {
  console.log(arg);
});
console.log(4)

// 3, 7, 4,
// 1, 2, 
// 5,
// macro 
//  micro(1), micro (2), then()