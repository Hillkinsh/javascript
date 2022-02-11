let a = 2;

// console.log(module.exports); //能打印出结果为：{}
// console.log(exports); //能打印出结果为：{}
console.log(exports === module.exports); // true

// exports 的操作
// exports.a = a; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}
// exports = "指向其他内存区"; //这里把exports的指向指走

// module.exports 的操作

module.exports = {
  a: 1,
  b: 2,
}; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}
module.exports = { c: "指向其他内存区" }; //这里把exports的指向指走

exports.a = a; // 注意，此时已经加不上了。因为此时module.exports exports的引用不同了。
