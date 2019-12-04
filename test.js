var mySqrt = function(x) {
    if (x<=0) return 0
    if (x === 1) return 1
    //都用double，int和float会过不了大数值测试
    //极限上下界
    let offset = 0.000005;
    //跳跃点
    let point = x;
    //跳跃上界
    let r = x;
    //跳跃下界
    let l = 0;
    while (true) {
        //判断是否达到“极限”
        if (point * point + offset > x
          && point * point - offset < x)
            break;
        //大了，改变跳跃上界
        if (point * point > x) {
            r = point;
            point = (r + l) / 2;
        }
        //小了，改变跳跃下界
        else if (point * point < x) {
            l = point;
            point = (r + l) / 2;
        }
    }
    return Math.floor(point);
};
// a = "1010", b = "1011"
console.log(mySqrt(1))
console.log(mySqrt(0))
console.log(mySqrt(8))
console.log(mySqrt(9))
console.log(mySqrt(36))
console.log(mySqrt(81))
console.log(mySqrt(1998))
console.log(mySqrt(807810077))


// 二分查找是什么