// 实现一个函数，返回对象的深拷贝

const origin = {
  a: {
    b: {
      c: [1, 5, 11, 23, 422]
    }
  },
  d: function() {
    console.log('hello world');
  },
  e: new Date()
};
/**
 * 返回输入值的深拷贝对象
 * 
 * tips: 对象可能包含 Function、Date 等特殊对象
 * 
 * @param origin {any}
 * @return {Object}
 */


function deepClone(data){
  let isArray = data => Array.isArray(data)
  let isObject = data => Object.prototype.toString.call(data) === '[object Object]'
  let isFunction = data => typeof data === 'function'
  let isDate = data => Object.prototype.toString.call(data) === '[object Date]'
  let obj
  if (isArray(data)) {
    obj = []
    for(let i = 0, len = data.length; i < len; i++){
      obj.push(deepClone(data[i]));
    }
  } else if (isObject(data)) {
    obj = {}
    for(let key in data){
      obj[key] = deepClone(data[key]);
    }
  } else if (isFunction(data)) {
    obj = cloneFunction(data)
  } else if (isDate(data)) {
    obj = new Date(data.toDateString())
  } else {
    return data
  }
  return obj
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
      const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}
let a = deepClone(origin)
console.log(Object.prototype.toString.call(a))
