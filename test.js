var arr = [2, 3, 1, 0, 2, 5, 3];

// 参数:
//        numbers:     一个整数数组
//        length:      数组的长度
//        duplication: (输出) 数组中的一个重复的数字
// 返回值:             
//        true  - 输入有效，并且数组中存在重复的数字
//        false - 输入无效，或者数组中没有重复的数字
function duplicate(numbers, length) {
  if( length <= 0)
      return false;

  for(let i = 0; i < length; ++i) { // 边界值处理
      if(numbers[i] < 0 || numbers[i] > length - 1)
          return false;
  }

  for(let i = 0; i < length; ++i) {
      while(numbers[i] != i)
      {
          if(numbers[i] == numbers[numbers[i]])
          {
              // *duplication = numbers[i];
              return numbers[i];
          }

          // 交换numbers[i]和numbers[numbers[i]]  
          console.log(numbers[i], i)           
          let temp = numbers[i];
          numbers[i] = numbers[temp];
          numbers[temp] = temp;
      }
  }

  return false;
}

let numbers1 = [ 2, 1, 3, 1, 4 ];
let numbers2 = [ 2, 4, 3, 1, 4 ];
let numbers3 = [ 2, 4, 2, 1, 4 ];
let numbers4 = [ 2, 1, 3, 0, 4 ];
let numbers5 = [ 2, 1, 3, 5, 4 ];

console.log(duplicate(numbers1, 5))
// console.log(duplicate(numbers2, 5))
// console.log(duplicate(numbers3, 5))
// console.log(duplicate(numbers4, 5))
// console.log(duplicate(numbers5, 5))