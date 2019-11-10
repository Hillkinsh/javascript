let arr = [
  [1,2,8,9],
  [2,4,9,12],
  [4,7,10,13],
  [6,8,11,15]
]
// 右上角开始找，
// 比目标值大，删列，
// 比目标值小，删行
// 注意边界值即可
function findTargetValueFromArr (arr, target) {
  let rol = arr.length - 1;
  let com = arr[0].length - 1;
  let result = false

  let i = 0
  while(i <= rol && com >= 0) { // 拿右上角的值
    if (arr[i][com]>target) {
      com -= 1
    } else if (arr[i][com]<target) {
      i += 1
    } else if (arr[i][com] == target) {
      result = true
      break
    }
    
  }
  return result
}
function test (value, valid) {
  return value + ': shoule be ' + valid +': '
}
console.log(test(1, true), findTargetValueFromArr(arr, 1))
console.log(test(2, true), findTargetValueFromArr(arr, 2))
console.log(test(3, false), findTargetValueFromArr(arr, 3))
console.log(test(4, true), findTargetValueFromArr(arr, 4))
console.log(test(5, false), findTargetValueFromArr(arr, 5))
console.log(test(6, true), findTargetValueFromArr(arr, 6))
console.log(test(7, true), findTargetValueFromArr(arr, 7))
console.log(test(8, true), findTargetValueFromArr(arr, 8))
console.log(test(9, true), findTargetValueFromArr(arr, 9))
console.log(test(10, true), findTargetValueFromArr(arr, 10))
