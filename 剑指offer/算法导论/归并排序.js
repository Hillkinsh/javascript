function merge (arr, left, mid, right) {
  let leftarr = []
  let rightarr = []
  for (let i=left; i<=mid; i++) {
    leftarr.push(arr[i])
  }
  for(let i=mid+1; i<right;i++) {
    rightarr.push(arr[i])
  }

  let iter_l = 0
  let iter_r = 0
  for (let i = 0; i < right - left; i++) {
    if (iter_l<leftarr.length && iter_r<rightarr.length) {
      if (leftarr[iter_l]<rightarr[iter_r]) {
        arr[i+left] = leftarr[iter_l]
        iter_l++
      } else {
        arr[i+left] = rightarr[iter_r]
        iter_r++
      }
    } else if(iter_l<leftarr.length && !(iter_r<rightarr.length)) {
      arr[i+left] = leftarr[iter_l]
      iter_l++
    } else {
      arr[i+left] = rightarr[iter_r]
      iter_r++
    }
  }
  console.log('p: q: r:', left, mid, right, leftarr, rightarr, arr)
}

function merge_sort(arr, p, r) {
  // console.log(arr)
  if (p < r) {
    let q = Math.floor((p + r) / 2)
    merge_sort(arr, p, q)
    merge_sort(arr, q + 1, r)
    merge(arr, p, q, r)
    // console.log('p: q: r: ', p, q, r)
    // console.log(arr)
  }
}
// let arr = [3,2,3,2,3,1]
// console.log(merge(arr, 1, 3, 5))
// console.log(arr)
let arr = [2,3,1,7,5,8,0]
merge_sort(arr, 0, 7)
// merge(arr, 0,0,1)
console.log(arr)
// let cur = [0,0,1]

// merge(arr, 0, 1, 3)