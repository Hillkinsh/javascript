
type Flatten<T extends any[]> = T extends [infer R, ...infer K] ?
  R extends any[]
    ? [...Flatten<R>, ...Flatten<K>]
    : [R, ...Flatten<K>]
: T;


type flatten = Flatten<[1, 2, [], [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
