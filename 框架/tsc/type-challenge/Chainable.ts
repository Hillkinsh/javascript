type Chainable<T = any> = {
	option<P extends string, K>(key: P, value: K): Chainable<T & { [U in P]: K }>;
	get(): T;
};
declare const config: Chainable;

const result:Result = config
	.option("foo", 123)
	.option("name", "type-challenges")
	.option("bar", { value: "Hello World" })
	.get();

// 期望 result 的类型是：
interface Result {
	foo: number;
	name: string;
	bar: {
		value: string;
	};
}

export {}