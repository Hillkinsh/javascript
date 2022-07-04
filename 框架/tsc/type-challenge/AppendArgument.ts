

// 题目：实现一个范型AppendArgument<Fn, A>，对于给定的函数类型 Fn，以及一个任意类型 A，返回一个新的函数 G。G 拥有 Fn 的所有参数并在末尾追加类型为 A 的参数。

type AppendArgument<T extends Function, U extends any>
  = T extends (...args: infer P) => infer R 
    ? (args: [...P, U]) => R 
    : never;

type Fn = (a: number, b: string) => number

type Result1 = AppendArgument<Fn, boolean> 
// 期望是 (a: number, b: string, x: boolean) => number