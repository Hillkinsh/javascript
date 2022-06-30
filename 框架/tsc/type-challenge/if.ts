type If<T extends boolean, U, V> = T extends true ? U : V;
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'