function reduceDimension(arr){
  let ret = [];
  
  let toArr = function(arr){
      arr.forEach(function(item){
          item instanceof Array ? toArr(item) : ret.push(item);
      });
  }

  toArr(arr);

  return ret;
}


function plain(arr) {
  let result = []
  toPlain(arr) 
  return result
  function toPlain(arr) {
    for (let i=0; i<arr.length; i++) {
      if (Array.isArray(arr[i])) {
        toPlain(arr[i])
      } else {
        result.push(arr[i])
      }
    }
  }
}

console.log(plain([1,2,[3,4,[5,6,]]]))

// 在元素组上改？
