// enum 
enum Direction {
  up = 1,
  down,
  left,
  right
}
let isMore: boolean = false;
let num: number = 1;
let myStr: string = 'abc';
let a: null = null;
let c: undefined;
let d: bigint;
let sym1: symbol;

// 任意值和类型推论
let anyval;
anyval = "ccc";

let anyval2 = "ccc";
let union1: null | number = 2;

// 定义对象的类型。接口

interface myObj {
  key: string,
  val: string,
  choose?: string,
  readonly justread: string,
}
const obj1: myObj = {
  key: "abc",
  val: "ddd",
  justread: "justread"
}
// 接口的可选属性
// 只读属性

// 数组的描述 类型 + 【】
let arr: number[] = [1,2,3];

// 范型，
let arr2:Array<number> = [1,2,4];

// 接口表示
interface Arr {
  [index: number]: number
}

// 断言
interface Error1 {
  name: string,
  age: string,
}

interface ApiError extends Error1 {
  code: number
}

interface HttpError extends Error1 {
  statusCode: number
}

function isApiError(error: Error1) {
  if (typeof (error as ApiError).code === "number") {
    return true;
  }
  return false;
}

let apiErr: ApiError = {
  code: 200,
  name: "string",
  age: "age"
}
let httpErr: HttpError = {
  statusCode: 500,
  name: "string",
  age: "age"
}
console.log(isApiError(apiErr));
console.log(isApiError(httpErr));

var myName = 'Tom';

type Foo = {};
