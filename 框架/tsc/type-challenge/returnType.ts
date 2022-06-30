const fn = (v: boolean) => {
	if (v) return 1;
	else return 2;
};

type tyof = typeof fn; // (v: boolean) => 1 | 2
let a:tyof // (v: boolean) => 1 | 2

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"

export {}