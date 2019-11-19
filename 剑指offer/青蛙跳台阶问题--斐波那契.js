// 青蛙一次可跳1个台阶，也可一次跳2个台阶。
// 当台阶为n时，的跳法
// 解题思路：
// 青蛙的第一次跳有两个选择：
// 1.第一次跳1，后面的跳法数为f(n-1)
// 2.第一次跳2，后面的跳法数为f(n-2) 
function fib (n) {
  if (n<=0) return 0;
  if (n=== 1) return 1;
  let i=1;
  let prev = 0;
  let next = 1;
  while(i<n) {
    let temp = prev;
    prev = next;
    next = temp + next
    i++;
  }
  return next
}
for (let iter = 0; iter<200; iter++) {
  console.log(fib(iter))
}
