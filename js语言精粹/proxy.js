let myObj = {
  name: 'xiaoming',
  age: 27
}
let obj = new Proxy(myObj, {
  get(target, key, receiver) {
    if (Reflect.has(target, key)) {
      return Reflect.get(target, key, receiver)
    } else {
      console.error('不存在的属性')
    }

  },
  set(target, key, value, receiver) {
    console.log(`set ${key}`)
    return Reflect.set(target, key, value, receiver)
  }
})

obj.a = 1
console.log(obj.a)
obj['a']
obj['b']
obj.b = 'bbb'
obj['b']

/**
 * proxy实际上重载了点运算符。
 * 
 */

// apply方法。拦截函数的调用， call apply操作

let obj2 = {
  foo() {
    return 'haha'
  },
  bar() {
    return 'bar'
  }
}

function foo() {
  return 'haha'
}
let proxyApply = new Proxy(foo, {
  apply(foo, ctx, args) {
    console.log('I am a proxy of function now.')
    return Reflect.apply(...arguments)
  }
})

// console.log(proxyApply())

// has 不能显式调用，key in objProxy这种用法
let obj3 = {
  name: 'xiaoming',
  age: 27,
  _sex: 'male'
}

let hasProxy = new Proxy(obj3, {
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
    return Reflect.has(target, key)
  }
})

// console.log('name' in hasProxy)
// console.log('_sex' in hasProxy)

// ownKeys

let obj4 = {
  a: 1,
  _b: 2,
  _c: 3
}

let ownk = new Proxy(obj4, {
  ownKeys(target) {
    return Reflect.ownKeys(target)
      .filter(item => {
        return item[0] !== '_'
      })
  }
})

console.log(Object.keys(ownk))
for (let property in ownk) {
  console.log(property)
}

// 一个在接口上的应用
const service = createWebService('http://example.com/data');

service.employees({
  a: 1,
  b: 2
}).then(json => {
  const employees = JSON.parse(json);
  // ···
});

function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return (obj) => axios({
        url: baseUrl + '/' + propKey,
        method: 'get',
        params: {
          ...obj
        }
      });
    }
  });
}