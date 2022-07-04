
// 拓展对象的属性

type Test = { id: '1' }

type AppendToObject<T extends object, K extends string | number, V> = {
  [A in keyof T | K]: A extends keyof T ? T[A] : V
}


type Result2 = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
