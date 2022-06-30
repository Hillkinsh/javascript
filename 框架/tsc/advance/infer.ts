// 题目：我们有 Promise<ExampleType> 如何获得 ExampleType？

// type bb = Promise<string>;
// type Awaitd<T extends Promise<unknown>> = T extends Promise<infer K> ? K: never;
// const ccd: Awaitd<b> = "";

// ：实现一个工具类型，它接受条件 c 为 true 或 false，c 为 true 返回 T，c 为 false 返回 U。
// type I0f<T extends boolean, K, P> = T extends true ? K : P;
// type A = I0f<true, "a", "b">; // expected to be 'a'
// type B = I0f<false, "a", "b">; // expected to be 'b'

// 在类型系统中实现Array.concat
// type Concat<T extends any[],K extends any[]> = [...T, ...K];
// type Result = Concat<[1], [2]>; // expected to be [1, 2]

// 在类型系统中实现Array.includes
// type Includes<K extends unknown[], U> = U extends K ? true : false;
// type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // exp


// // interface Todo {
// // 	title: string;
// // 	description: string;
// // 	completed: boolean;
// // }
// type MyPick2<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
// type TodoPreview2 = MyPick2<Todo, "title" | "completed">;

// const todo3: TodoPreview2 = {
// 	title: "Clean room",
// 	completed: false,
// };

const fn = (v: boolean) => {
	if (v) return 1;
	else return 2;
};
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"