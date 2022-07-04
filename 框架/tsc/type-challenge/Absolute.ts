

type Test = -100;

type Absolute<T extends string | number | bigint > = `${T}` extends `-${infer R}` ? `${R}` : `${T}`;

type Result = Absolute<Test>; // expected to be "100"

export {}