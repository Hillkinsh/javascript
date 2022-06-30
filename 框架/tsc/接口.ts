// 使用接口定义对象的类型

interface Person {
  name: string,
  readonly genter: boolean,
  age?: number,
  [propertyName: string]: any
}