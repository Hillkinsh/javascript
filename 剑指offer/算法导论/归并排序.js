function merge (arr, left, mid, right) {
  let leftarr = []
  let rightarr = []

  for (let i = left; i <= mid; i++) {
    leftarr.push(arr[i])
  }
  for(let i = mid + 1; i < right; i++) {
    rightarr.push(arr[i])
  }
  console.log('leftArr:', leftarr)
  console.log('rightarr:', rightarr)

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
  // console.log('p: q: r:', left, mid, right, leftarr, rightarr, arr)
}

function merge_sort(arr, p, r) {
  if (p < r) {
    let q = Math.floor((p + r) / 2)
    merge_sort(arr, p, q)
    merge_sort(arr, q + 1, r)
    merge(arr, p, q, r)
  }
}

let arr = [2,3,1,7,5,8,0]
// merge_sort(arr, 0, 7)
// console.log(arr);
function myMerge(arr, p, q, r) {
  const leftarr = [];
  const righttarr = [];
  for (let i = p; i <= q; i++) {
    leftarr.push(arr[i]);
  }

  for (let j = q + 1; j < r; j++) {
    righttarr.push(arr[j]);
  }

  let iter_l = 0;
  let iter_r = 0;
  for (k = 0; k < r - p; k++) {
    if (iter_l < leftarr.length && iter_r < righttarr.length) {
      if (leftarr[iter_l] < righttarr[iter_r]) {
        arr[k + p] = leftarr[iter_l];
        iter_l++;
      } else {
        arr[k + p] = righttarr[iter_r];
        iter_r++;
      }
    } else if (iter_l < leftarr.length && !(iter_r<righttarr.length)) {
      // do noting
      arr[k + p] = leftarr[iter_l];
        iter_l++;
    } else {
      arr[k + p] = righttarr[iter_r];
        iter_r++;
    }
    
  //   console.log("arr ,r, leftarr[iter_l], righttarr[iter_r]::btm:", arr)
  }
}

function ms(arr, p, r) {
  if (p < r) {
    const q = Math.floor((p + r) / 2)
    ms(arr, p, q);
    ms(arr, q + 1, r);
    myMerge(arr, p, q, r);
    // merge(arr, p, q, r);
  }
}

ms(arr, 0, 7)
console.log(arr);
// merge(arr, 0, 1, 3)