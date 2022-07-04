
type Replace<T extends string, U extends string, V extends string> =
  T extends `${infer A}${U}${infer C}` ? `${A}${V}${C}` : T;

type replaced = Replace<'types are fun!', 'types are fun!', 'awesome'> // expected to be 'types are awesome!'
