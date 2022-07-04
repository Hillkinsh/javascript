
type ConstructTuple<T, C extends unknown[] = []> = C['length'] extends T ? C : ConstructTuple<T, [...C, unknown]>

type result = ConstructTuple<2> // expect to be [unknown, unkonwn]