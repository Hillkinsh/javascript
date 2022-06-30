// 范型
// 函数 接口或类不预先指定类型。而是在使用时指定。

function createArr<T>(num: number, value:T):Array<T>{
  let result:T[] = [];
  for (let i: number = 0; i < num; i++) {
    result.push(value);
  }
  return result;
}

function swap<T, U>(tuple:[T, U]):[U, T] {
  return [tuple[1], tuple[0]];
}

// 范型约束。
interface Lengthwise {
  length: number
}
function hasLength<T extends Lengthwise>(a:T):number {
  return a.length;

}

console.log(hasLength("adb"))
