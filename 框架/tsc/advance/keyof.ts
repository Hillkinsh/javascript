// // TypeScript 允许我们遍历某种类型的属性，并通过 keyof 操作符提取其属性的名称
// interface Peson {
//   name: string,
//   age: number,
//   genger: boolean
// }


// type b = Promise<string>;
// type Awaitd<T extends Promise<unknown>> = T extends Promise<infer K> ? K: never;
// const c999: Awaitd<b> = "";

// type If<K extends boolean, U, T> = K extends true ? U : T;
// type A = If<true, "a", "b">; // expected to be 'a'
// type B = If<false, "a", "b">; // expected to be 'b'
// type Concat<K extends unknown[], T extends unknown[]> = [...K, ...T]
// type Result = Concat<[1], [2]>; // expected to be [1, 2]
// type Includes<K extends unknown[], T> = T extends K ? 'true' : 'false'
// type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
