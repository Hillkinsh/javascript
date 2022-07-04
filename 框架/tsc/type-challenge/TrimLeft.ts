type TrimLeft<T> = T extends `${" " | "\n" | "\t"}${infer R}`? TrimLeft<R> : T

type trimed = TrimLeft<' Hello World  '> // expected to be 'Hello World  '
