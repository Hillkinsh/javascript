var countAndSay = function (n) {
  if (n == 1) return '1'
  let result = '1'
  let temp
  let count

  for (let i = 1; i < n; i++) {
    temp = ''
    count = 1
    for (let j = 0; j < result.length; j++) {
      if (j < result.length) {
        if (result[j] === result[j + 1]) {
          count++
        } else {
          temp += count + result[j]
          count = 1
        }
      }
    }
    result = temp
  }
  return result
}
console.log(countAndSay(3))
console.log(countAndSay(4))
console.log(countAndSay(5))
console.log(countAndSay(6))
console.log(countAndSay(7))