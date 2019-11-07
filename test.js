/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var threeSum = function(nums) {
//   // 先排序处理即可。
//   let newNum = nums.sort((a, b) => {
//     return a > b
//   })
//   // console.log(newNum)
//   let target
//   let result = []
//   let obj = {}
//   for (let pos = 0; pos<newNum.length; pos ++) {
//     target = newNum[pos]
//     obj = {}
//     if (pos>0 && target == newNum[pos-1]) {
//       continue
//     }
//     newNum.slice(pos+1).forEach(item => {
//       if (obj[-target -item] != undefined) {
//         if (result.length) {
//           if (target == obj[-target -item] && target == item) {
//             continue
//           }
//         }
//         result.push([target, obj[-target -item], item])
//       } else {
//         obj[item] = item // 这个位置放的下标
//       }
//     })
//   }
//   return result
// };

// -4, -1, -1, 0, 1, 2
// console.log(threeSum([-1, 0, 1, 2, -1, -4]))

function printLog10 (time=10) {
	let current = 0;
	let print = cb => {
    current ++
    if (current >= time) {
      cb()
    } 
    else {
      console.log('message')
    }
  }
  let cancel = () => {
    clearInterval(timer)
  }

 let timer = setInterval(_ => print(cancel), 100)
}

function camel2kabb (str) {
  let result = ''
  let checkReg = /[A-Z]/
  str.split('').forEach(i => {
    if (checkReg.test(i)) {
      result = result + '_' + i.toLowerCase()
    } else {
      result = result + i
    }
  })
  return result
}
// console.log(camel2kabb('heWorLd'))

function addPoint(num) {
  let strNum = String(num)
  let pos = strNum.length % 3
  let length = strNum.length

  let result = pos
    ? strNum.slice(0, pos)
    : ''

  while(pos < length) {
    if (pos < length - 3) {
      result = result
        ? result + '.' + strNum.slice(pos, pos + 3)
        : strNum.slice(pos, pos + 3)
    } else {
      result = result
        ? result + '.' + strNum.slice(pos)
        : strNum.slice(pos)
    }
    pos += 3
  }
  return result
}

function sleep(duration){
  return new Promise(function(resolve){
      setTimeout(resolve, duration);
  })
}
async function changeColor(duration,color){
  console.log('color:', color)
  await sleep(duration);

}
async function main(){
  while(true){
      await changeColor(3000,"green");
      await changeColor(1000, "yellow");
      await changeColor(2000, "red");
  }
}
main()