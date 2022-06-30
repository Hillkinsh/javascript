// 接口
interface UtilMtd {
  (name:string, age:number):string
}
let myFoo:UtilMtd;
myFoo = function(name: string, age: number) {
  return `${name}今年${age}啦`;
}