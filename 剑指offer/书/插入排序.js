// INSERTION-SORTION(A)
// for j=2 to A.length
//   key = A[j]
//   i = j -1
//   while i>0 and A[i]>key
//     A[i+1] = A[i]
//     i = i-1
//   A[i+1] = key
function insert (arr) {
  if (!arr || !arr.length) return new Error('数组格式不正确')
  let temp
  for (let i=1; i<arr.length; i++) {
    temp = arr[i]
    let j = i - 1
    while (j>=0 && arr[j]>temp) {
      arr[j+1] = arr[j]
      j--
    }
    arr[j+1] = temp
  }
  return arr
}

console.log(insert(true))
console.log(insert([1,2,86,4]))