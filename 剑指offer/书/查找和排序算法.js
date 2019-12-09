// 基本算法掌握 1 + 4
// 二分查找
// 冒泡，快排，归并，插入。

// 二分查找
function find (arr, x) {
  if (!arr.length) return null
  let pre = 0;
  let end = arr.length - 1
  let mid
  let result = null
  while (pre<=end) {
    mid = Math.floor((pre + end) / 2)
    if (x<arr[mid]) {
      end = mid-1
    }else if (x>arr[mid]) {
      pre = mid+1
    } else {
      return result = mid
    }
  }
  return result
}

// bubbule 轮番比较,替换
function bubble (arr) {
  let temp
  for (let i=1; i<arr.length; i++) {
   for (let j=i; j<arr.length; j++) {
    if (arr[j]<arr[j-1]) {
      temp = arr[j-1]
      arr[j-1] = arr[j]
      arr[j] = temp
    }
   }
  }
  return arr
}
// console.log(bubble([2,1,6,4,3]))

function quick (arr) {
  if (arr.length<=1) return arr
  let flag = arr[0]
  let left = []
  let right = []
  for (let i=1; i<arr.length; i++) {
    if (arr[i]<flag) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quick(left), flag, ...quick(right)]
}

// 插入排序 
// 从下标1开始每增1项排序一次，越往后遍历次数越多
// 拿到一个新值，不断的回插。从后往前插
function insert (arr) {
  let result = [arr[0]]
  for (let i=1; i<arr.length; i++) {
    let j=i-1
    let temp =arr[i]
    // 插入值，小于当前位置，则把当前位置的值，右移
    while(j>=0 && arr[j]>temp) { 
      result[j+1] = result[j]
      j--
    }
    j++
    result[j]=temp
  }
  return result
}
console.log(insert([2,1,6,4,3,8]))

