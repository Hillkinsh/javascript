function withAfter(listArr) {
  let list = listArr.slice();
  let tag = 0;
  let accum = 0;
  for (var i = 0; i < list.length; i++) {
    accum += list[i].length
    if (accum <= 11) {
      list[i].before = true;
      accum += 2 
    } else {
      accum = 0
    }
  }
  console.log('list:::,', list)
  return list
}