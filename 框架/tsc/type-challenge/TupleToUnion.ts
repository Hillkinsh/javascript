type Arr1 = ["1", "2", "3"];

type TupleToUnion<T extends unknown[]> = T[number]
const tup: TupleToUnion<Arr1> = '3'; // expected to be '1' | '2' | '3'