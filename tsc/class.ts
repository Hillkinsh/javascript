// 类的基本定义

class Basic {
  a='1';
  public b=2;
  private c=3; // 私有属性，只能在Basic中使用
  protected d=4; // 受保护属性，只能在类和子类中使用
  static e=5;// 静态属性，
}
let basic = new Basic();
console.log(basic.a)
console.log(basic.b)
// console.log(basic.c)
// console.log(basic.d)
// console.log(Basic.e)