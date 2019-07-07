// typeof为什么不靠谱
// "foo"               String     string
// new String("foo")   String     object
// 1.2                 Number     number
// new Number(1.2)     Number     object
// true                Boolean    boolean
// new Boolean(true)   Boolean    object
// new Date()          Date       object
// new Error()         Error      object
// [1,2,3]             Array      object
// new Array(1, 2, 3)  Array      object
// new Function("")    Function   function
// /abc/g              RegExp     object
// new RegExp("meow")  RegExp     object
// {}                  Object     object
// new Object()        Object     object 

function dataType(obj) {
  var class2type = {} ;
  let typeStr = "Boolean Number String Null Undefined Symbol Function Array Date RegExp Object Error"
  typeStr.split(" ").forEach(function(e,i) {
      class2type[ "[object " + e + "]" ] = e.toLowerCase();
  })
  return class2type[ class2type.toString.call(obj) ]
}


let testArr = [
  'foo',             // string
  new String("foo"), // string
  1.2,               // number
  new Number(1.2) ,  // number
  true,              // boolean
  new Boolean(true), // boolean
  new Date(),        // date
  new Error ,        // error
  [1,2,3],           // array
  new Array(1, 2, 3),// array
  new Function(""),  // function
  /abc/g,            // regexp
  new RegExp("meow"),// regexp
  {},                // object
  new Object()       // object
]
testArr.forEach(function(item, idx) {
  console.log(dataType(item))
})