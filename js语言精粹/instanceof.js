function instanceof2 (a, constr) {
  let ctr = a.__proto__.constructor
  while(ctr) {
    if (ctr === constr) {
      return true
    }
    a = a.__proto__
    ctr = a && a.__proto__ && a.__proto__.constructor
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
