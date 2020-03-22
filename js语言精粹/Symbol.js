// symbol在解决什么问题。
// es5的对象名都是字符串，这就容易造成命名冲突。比如使用了别人提供的一个对象，又想往里面添加新的方法（mixin模式）
// 新方法名可能就会出现冲突，如果有一种机制可以保证属性名独一无二该多好。而symbol就是做这个的

//1. symbol初始化
let symbol1 = Symbol('1') // 1是该symbol的描述，是为了区分不同的symbol用的
let symDesc = symbol1.description // 1

//2. 作为属性名
let a = {
  q: 1
}
a[symbol1] = 'hello'

let b = {
  [symbol1]: 'hello2'
}
// 3. 属性名的遍历
//   1. for in
//   2. for of
//   3. Object.keys
//   4. Object.getOwnPropertyNames()
//   5. JSON.stringify
// 这些都无法获取symbol属性

// 1. getOwnPropertySymbols
const objectSymbols = Object.getOwnPropertySymbols(a);
// 2. Reflect.ownKeys() 会返回所有类型属性名
const allKeys = Reflect.ownKeys(s)

console.log(objectSymbols) // [Symbol(1)]

// 3. API
// 当想要多个地方使用同一个symbol时，可以用symbol.for
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
// Symbol.for 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的symbol，有则返回。否则创建并注册到“全局”

// Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined


// 应用1:消除魔术字符串
let getArea = (shape, options) => {
  let area = 0;
  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
      /* ... more code ... */
  }

  return area;
}

getArea('Triangle' /* 魔术字符串*/ , {
  width: 100,
  height: 100
});

// 普通的消除方法：把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合
{
  const shapeType = {
    triangle: 'Triangle'
  };

  let getArea = (shape, options) => {
    let area = 0
    switch (shape) {
      case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;
    }
    return area;
  }

  getArea(shapeType.triangle, {
    width: 100,
    height: 100
  });
}
// 事实上其实并不关心shapeType.triangle具体是什么值。
// 只要确保他和其他shapetype冲突就可以了
// 因此，下面可以使用这种用法
const shapeType = {
  triangle: Symbol()
};