function merge (arr, p, q, r) {
  let left = []
  let right = []
  for (let i=0; i < q - p; i++) {
    left.push(arr[p + i])
  }
  for (let i=0; i < r - q; i++) {
    right.push(arr[q+i])
  }
  // console.log(left, right)
  let left_iter = 0
  let right_iter = 0
  for (let i=p; i<r; i++) {
    if (left[left_iter] <= right[right_iter]) {
      arr[i] = left[left_iter]
      left_iter++
    } else {
      arr[i] = right[right_iter]
      right_iter++
    }
  }
}
function merge_sort(arr, p, r) {
  if (p < r) {
    let q = Math.floor((p + r) / 2)
    // console.log(q)
    merge_sort(arr, p, q)
    
    merge_sort(arr, q + 1, r)
    merge(arr, p, q, r)
    console.log('p: q: r: ', p, q, r)
    console.log(arr)
  }
}
// let arr = [1,2,3,2,3,4]
// console.log(merge(arr, 0, 3, 6))
let arr = [2,3,1,7,5,8,0]
console.log(merge_sort(arr, 0, 7))
console.log(arr)
let cur = [0,0,1]
