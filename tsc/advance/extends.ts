// // 条件类型 extends
// // 条件类型是一种条件表达式进行类型的关系检测。

// const num: number = 1; // 可被分配
// const str: string = 2; // 不可被分配

// type IsNum<T> = T extends number ? number : string

// type Num = IsNum<1>   // number;
// type Str = IsNum<'1'> // string;


// const array1 = ['a', 'b', 'c'] as const;
// type Arr2Obj<T extends string[]> = {
//   [K in T[number]]: K
// }
// const fn = (v: boolean) => {
// 	if (v) return 1;
// 	else return 2;
// };
// // const fn2 = 
// type MyReturnType<T> = T extends (...argus: any[]) => infer R ? R : never;
// type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"

// interface Todo {
// 	title: string;
// 	description: string;
// 	completed: boolean;
// }
// type MyOmit<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
// type TodoPreview = MyOmit<Todo, "description" | "title">;

// const todo: TodoPreview = {
// 	completed: false,
// };