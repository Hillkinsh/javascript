function swap (data, posA, posB) {
  let temp = data[posA]
  data[posA] = data[posB]
  data[posB] = temp
}

function partition (arr, begin, end) {
  let value = arr[end]
  let privot = begin - 1
  for (let i = begin; i < end; i++) {
    if (arr[i] <= value) {
      privot++
      [arr[privot], arr[i]] = [arr[i], arr[privot]]
    }
  }
  [arr[privot + 1], arr[end]] = [arr[end], arr[privot + 1]]
  return privot + 1
}

function quickSort (arr, begin, end) {
  if (begin < end) {
    let index = partition(arr, begin, end)
    quickSort(arr, begin, index - 1)
    quickSort(arr, index + 1, end)
  }
}

let arr = [5,1,7,6,3,4]
quickSort(arr, 0, arr.length-1)
console.log(arr)

function random_partition (arr, begin, end) {
  let index = ~~(Math.random() * (end - begin + 1)) + begin
  swap(arr, index, end)
  return partition(arr, begin, end)
}