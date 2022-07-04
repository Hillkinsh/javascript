type Capitalize1<T extends string> = T extends `${infer P}${infer R}` ? `${Uppercase<P>}${R}`: T;

type capitalized = Capitalize1<'hello world'> // expected to be 'Hello world'

// type ToupperCase<T extends string> = T.
let a1: capitalized = 'Hello world'

