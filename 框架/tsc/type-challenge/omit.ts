interface Todo {
	title: string;
	description: string;
	completed: boolean;
}

type exclude<T, U> = T extends U ? never : T

type ex = exclude<'a' | 'b' | 'c', 'a'>

type MyOmit<T, U extends keyof T> = {
  [K in exclude<keyof T, U>]: T[K]
}

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo1: TodoPreview = {
	completed: false,
};