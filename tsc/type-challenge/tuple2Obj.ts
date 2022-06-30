const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
type a = typeof tuple;
let a: a = ["tesla", "model 3", "model X", "model Y"];
type b = a[number]
let b:b = "model 3";

type TupleToObject<T extends readonly string[]> = {
	[P in T[number]]: P;
};

let result: TupleToObject<typeof tuple>;
result = {
  tesla: 'tesla',
  'model 3': 'model 3',
  'model X': 'model X',
  'model Y': 'model Y'
}
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
export { }