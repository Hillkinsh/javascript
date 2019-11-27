//随便找一个值，让比他小的放在左边，比他大的放在右边。返回该值的下表即可。
// 只有对范围内的数字进行排列
let data = [3,1,4,2,9,6,7,8]
function partition (data, length, start, end) {
  let index = start + Math.floor(Math.random() * (end - start))
  swap(index, end)

  let small = start - 1
  for (index = start; index < end; ++index) {
    if (data[index] < data[end]) {
      ++small;
      if (small != index) {
        swap(index, small)
      }
    }
  }
  ++small;
  swap(small, end)
  console.log(data, 'data')
  return small
}

function swap (posA, posB) {
  let temp = data[posA]
  data[posA] = data[posB]
  data[posB] = temp
}


console.log(partition(data, 8, 0, 7), data)
