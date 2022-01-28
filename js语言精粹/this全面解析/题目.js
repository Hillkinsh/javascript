var num = 1;
var myObject = {
    num: 2,
    add: function() {
        this.num = 3;
        (function() {
            console.log(this.num);
            this.num = 4;
            console.log(this.num);
        })(); // 立即执行在全局
        console.log(this.num); // 3
    },
    sub: function() {
        console.log(this.num)
    }
}
var add = myObject.add;
add(); // 3 4 4
console.log(myObject.num); // 2
myObject.add(); // 4, 4，3
console.log(myObject.num); // 3，
console.log(num); // 4
var sub = myObject.sub;
sub(); // 4

/**
 * 分析：
 * 情况1: myObject.add();
 * this.num = 3, 会修改myObject.num，所以此时的 myObject.num = 3
 * 立即执行函数的环境是全局，所以其打印的this.num 为全局的1，
 * 执行this.num 后，全局的值就被修改。
 */