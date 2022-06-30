// 手动指定一个值的类型

interface Cat {
  name: string,
  jump():void,
}
interface Fish {
  name: string,
  swim():void,
}
// ts不会报错，但编译时可能报错
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
}
return false;
}