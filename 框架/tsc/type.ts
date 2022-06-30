// keyof 使用：TypeScript 允许我们遍历某种类型的属性，并通过 keyof 操作符提取其属性的名称。

interface People {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof People; // 获取People所有的key: name | age | location;

let k2: keyof People = "name";

//  应用：

function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

type ToDo = {
  name: string;
  age: number;
  location: string;
}
const todo: ToDo = {
  name: 'a',
  age: 18,
  location: 'bj'
};

prop(todo, 'name');
// prop(todo, 'name2'); // 类型“"name2"”的参数不能赋给类型“keyof ToDo”的参数
