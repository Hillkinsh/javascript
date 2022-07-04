
type ReplaceAll<T extends string, U extends string, V extends string> = 
  T extends `${infer A}${U}${infer B}` ? ReplaceAll<`${A}${V}${B}`, U, V>: T

type replacedw = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
