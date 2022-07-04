type Trim<T> = T extends `${' '|'\t'|'\n'}${infer R}${' '|'\t'|'\n'}`? Trim<R>: T

type trimed3 = Trim<'  Hello World  '> // expected to be 'Hello World'
