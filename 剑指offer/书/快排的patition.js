function partition(arr, begin, end) {
  let pivotIndex = begin;
  let pivot = arr[pivotIndex];
  swap(arr, pivotIndex, end);

  let low = begin;
  let high = end;

  while (low < high) { // 因为把pivot放在了最后，所以low指针先走
    while (low < high && arr[low] <= pivot) low++; // 寻找左边不应该存在的点
    while (low < high && arr[high] >= pivot) high--; // 寻找右侧不应该存在的点
    if (low < high) {
      swap(arr, low, high)
    };
  }

  swap(arr, low, end);
  return low;
}

function swap(data, posA, posB) {
  let temp = data[posA]
  data[posA] = data[posB]
  data[posB] = temp
}

function quickSort(arr, begin, end) {
  if (begin < end) {
    let index = partition(arr, begin, end)
    quickSort(arr, begin, index - 1)
    quickSort(arr, index + 1, end)
  }
}
let arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
quickSort(arr, 0, arr.length - 1)