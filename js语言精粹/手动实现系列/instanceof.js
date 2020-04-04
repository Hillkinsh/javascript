function instanceof2 (a, constr) {
  let ctr = a.__proto__
  while(ctr) {
    if (ctr === constr.prototype) {
      return true
    }
    a = a.__proto__
    ctr = a && a.__proto__ && a.__proto__
  }
  return false
}

let Cs = function (name) {
  this.name = name
}

let cs = new Cs('haha')

// console.log(instanceof2(cs, Cs))

function C() {}
function D() {}

let o = new C()

console.log(instanceof2(o,  C))
console.log(instanceof2(o,  D))
console.log(instanceof2(o,  Object))
