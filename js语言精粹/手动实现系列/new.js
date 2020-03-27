function _new (ctor) {
  let obj = Object.create(ctor.prototype)
  let argsArr = [].slice.call(arguments, 1)
  let ctorReturnResult = ctor.apply(obj, argsArr)
  var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
    return obj
}

