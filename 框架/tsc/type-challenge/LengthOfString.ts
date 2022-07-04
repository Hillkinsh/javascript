
type a = "hell5";

type LengthOfString<T extends string, U extends string[] = []>
  = T extends `${infer R}${infer K}`
    ? LengthOfString<K, [...U, R]>
    : U["length"];


type b = LengthOfString<a>; // type b = 12

    
export {}