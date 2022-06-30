type X = {
	x: {
		a: 1;
		b: "hi";
	};
	y: "hey";
};

type Expected = {
	readonly x: {
		readonly a: 1;
		readonly b: "hi";
	};
	readonly y: "hey";
};

// 递归思路
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
};

let todo3: DeepReadonly<X> = {
  x: {
		a: 1,
		b: "hi",
	},
	y: "hey",
}; // should be same as `Expected`
