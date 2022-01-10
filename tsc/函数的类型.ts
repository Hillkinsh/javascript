// 函数声明
function foo(x: string, y: number): string {
  return `${x}-${y}`;
}

// 函数表达式
let bar: (x:string, y:number) => string = function (x:string, y:number):string {
  return '';
}

// 接口定义函数形状

interface Fun {
  (x:string, y:number):string
}
let myInfo:Fun;

myInfo = function(x:string, y: number) {
  return '';
}