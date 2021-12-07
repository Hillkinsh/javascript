// > js支持给基本类型添加方法。通过给基本类型添加方法，可以极大的提高语言的表现力。

Function.prototype.method = function (name, fn) {
  this.prototype[name] = fn
  return this
}


// 比如扩充number方法：

Number.method('integer', function () {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

// console.log((5.1).integer());
// console.log((-5.1).integer());

// 字符串添加trim

String.method('trim', function () {
  return this.replace(/^\s+|\s+$/, '');
});
 
// console.log('abc  '.trim())
// console.log('   abc  '.trim())


// 柯理化

Function.method('curry', function () {
  const slice = Array.prototype.slice;
  const args = slice.apply(arguments);
  const that = this;
  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)))
  }
});
let add = function (a, b) {return a + b};
let add5 = add.curry(5);

console.log(add5(6))