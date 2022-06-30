// 1.基本描述
const arr1: number[] = [1,2,3];

// 2.范型描述
const fib: Array<number> = [2,3,4];

// fib.push('a'); 报错

// 3.接口表示数组

interface NumberArray {
  [property: number]: string
}

const na: NumberArray = ['1', '2'];