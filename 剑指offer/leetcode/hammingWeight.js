var hammingWeight = function(n) {
    let count = 0;
    while(n) {
      if (n & 1 === 1) {
        count++;
      }
      n = n >>> 1;
    }
    return count;
};

var add = function(a, b) {
 0000 0001
 0000 0011

 & 
 0000 0001

 << 
 0000 0010 // 进位

 ^ 0000 0010 // 异或
 
 // 或
 0000 1111
 // 与
 0000 0000
 // ^
 0000 1111
};

console.log(hammingWeight(4294967293));