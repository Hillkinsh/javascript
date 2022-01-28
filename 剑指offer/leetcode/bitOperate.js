// add 

function add (a, b) {
  while(b !== 0) {
    var c = (a&b)<<1;
    a = a ^ b;
    b = c;
  }
  return a;
}
// 除法
var divide = function(dividend, divisor) {

};

var reverseBits = function(n) {
    
};

console.log(add(12, 3));