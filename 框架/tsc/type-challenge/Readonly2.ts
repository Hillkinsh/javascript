interface Todo {
	title: string;
	description: string;
	completed: boolean;
}

type exc<T,U> = T extends U ? never : T;
type eee = exc<'a' | 'b' | 'c', 'a'>

type MyReadonly2<T, U extends keyof T> = {
  readonly [K in U]: T[K]
} & {
  [W in exc<keyof T, U>]: T[W]
}

const todo2: MyReadonly2<Todo, "title" | "description"> = {
	title: "Hey",
	description: "foobar",
	completed: false,
};

todo2.title = "Hello"; // Error: cannot reassign a readonly property
todo2.description = "barFoo"; // Error: cannot reassign a readonly property
todo2.completed = true; // OK