
type a = {
  x: 1;
  y: 3;
};

type b = {
  y: 2;
  z: 3;
};

type Merge<T extends object, U extends object> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
      ? T[K]: never
}
type c = Merge<a, b>; // c { x: 1, y: 2, z: 3 }

export {}