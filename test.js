function partition(data, length, start, end) {
  if (!data || length <= 0 || start < 0 || end >= length) {
    throw new Error('无效的参数')
  }
  let index = Math.random() * (end - start)
  index = Math.floor(index)
  index += start

  [data[index], data[end]] = [data[end], data[index]] // swap(index, end)

  let small = start - 1
  for (index = start; index < end; index++) {
    if (data[index] < data[end]) {
      small++
      if (small !== index) {
        [data[index], data[small]] = [data[small], data[index]]
      }
    }
  }
  small++

  [data[small], data[end]] = [data[end], data[small]]
  return small
}

function quickSort(data, length, start, end) {
  if (start == end) return
  let index = partition(data, length, start, end)
  if (index > start) {
    quickSort(data, length, start, index - 1)
  }
  if (index < end) {
    quickSort(data, length, index + 1, end)
  }
}

let nums = [2, 0, 2, 1, 1, 0]

quickSort(nums, 6, 0, 5)

console.log(nums)