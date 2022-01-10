function subSt(l1, l2) {
  let list = [[0]];
  for (let i = 0; i < l1.length; i++) {
    for (let j = 0; j < l2.length; j++) {
      list[i] = list[i] || [];
      if (i == 0 || j == 0) {
        list[i][j] = 0;
      } else if (l1[i] === l2[j]) {
        list[i][j] === list[i-1][j-1] + 1;
      } else {
        list[i][j] = list[i - 1][j] > list[i][j - 1] ? list[i - 1][j] > list[i][j - 1];
      }
    }
  }
  return list[l1.length - 1][l2.length - 1];
}

console.log(subSt('abbcbde', 'dbbcdb'))