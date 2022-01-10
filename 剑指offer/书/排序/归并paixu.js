// 分治策略
// pq 和qr都是排序好的。
function merge(A, p,q,r) {
  let n1 = q - p + 1;
  let n2 = r - q;
  const L = new Array(n1 + 1);
  const R = new Array(n2 + 1);
  for (let i = 0; i < n1.length; i++) {
    L[i] = A[p + i];
  }
  for (let j = 0; j < n2.length; j++) {
    L[j] = A[q + j];
  }
  // for (let i = 1; i < )
}