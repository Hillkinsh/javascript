type x = string | number | boolean;

type y = string | number;

type MyExclude<T, U> = T extends U ? never : T;

type c = MyExclude<x, y>;

const b: c = true;