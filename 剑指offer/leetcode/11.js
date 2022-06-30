var maxArea = function(height) {
  let result = 0;
  let pre = 0;
  let aft = height.length - 1;
  while(pre < aft) {
    const tmp = Math.min(height[pre], height[aft]) * (aft - pre);
    if (tmp > result) {
      result = tmp;
    }
    if (height[pre] > height[aft]) {
      aft--;
    } else {
      pre++;
    }
  }
  return result;
};

var height = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(height))