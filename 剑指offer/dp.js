const p = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30]; // 下标表示钢条长度，值表示对应价格

// 切木棒问题
function cut_rod3(n) {
  let r = [0, 1];   // r数组记录每个长度的最大收益
  let leftLength = [0, 1];  // 数组leftLength记录切割一次时左边的长度
  let solution = [];

  for(let i = 2; i <=n; i++) {
    let max = p[i];
    leftLength[i] = i;     // 初始化左边为整块不切
    for(let j = 1; j <= i; j++) {
      let sum = p[j] + r[i - j];

      if(sum > max) {
        max = sum;
        leftLength[i] = j;  // 每次找到大的值，记录左边的长度
      } 
    }

    r[i] = max;
  }

  // 回溯寻找最佳方案
  let tempN = n;
  while(tempN > 0) {
    let left = leftLength[tempN];
    solution.push(left);
    tempN = tempN - left;
  }

  console.log(leftLength);  // [0, 1, 2, 3, 2, 2, 6, 1, 2, 3]
  console.log(solution);    // [3, 6]
  console.log(r);           // [0, 1, 5, 8, 10, 13, 17, 18, 22, 25]
  return {max: r[n], solution: solution};
}

cut_rod3(9);  // {max: 25, solution: [3, 6]}