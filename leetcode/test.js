var twoSum = function(nums, target) {
    let obj = {}
    for(let i=0; i<nums.length; i++) {
        if (obj[target - nums[i]] != undefined) {
            return [i, obj[target - nums[i]] ]
        } else {
            let value = nums[ i],
            key = i
            
            obj[value] = key
        }
    }
};

// console.log(twoSum([2, 7, 11, 15],  9))

var maxArea = function(height) {
    let i=0,
    j=height.length - 1,
    max = 0
    while(i<j) {
        max = Math.max(max, Math.min(height[i], height[j]) * (j-i))
        if (height[i]>height[j]) {
            j--
        } else {
            i++
        }
    }
    return max
};

// console.log(maxArea([1,8,6,2,5,4,8,3,7]))

// -2 -1 0 1 2 3

var threeSum = function(nums) {
    if(nums.length<3)  return []
    nums = nums.sort((a,b)=>{return a-b })

    let result = []
    for (let i=0; i<nums.length-2; i++) {
        if (i-1>=0 && nums[i] == nums[i-1]) {
            continue // 首值优化
        }

        let left = i+1 , 
            right = nums.length - 1
        while (left < right ) {
            let value = nums[i] + nums[left] + nums[right]
            if (value>0) {
                right--
            } else if (value < 0){
                left++
            } else{
                result.push([nums[i], nums[left], nums[right]])
                right--
                left++
                while(left < right) {
                    console.log('dd')
                    if (nums[left]==nums[left-1]) {
                        left++
                    }else if (nums[right]==nums[right+1]) {
                        right--
                    } else {
                        break
                    }
                }
            } 
        }
    }
    return result
};

// console.log(threeSum([0,0,0,0]))

// 三数之合为0
// 思路：定第一个数，后两个相加看结果。


function a (nums) {

    // 算法的核心思想是去除重复的数组，
    // 重复出现的情况分两种：
    // a a -2a & a b -(a + b)
    // 第一种的出重，
    // 先确定数组的中间值 value(k)，再去勘定
    // -value(k)*2 是否存在，如果存在，则看
    // 是否 value(k-2)==value(k-1) 如此则保证了相同元素不重复
    // 第二种出重，是
    // 找到满足条件的 a b c，然后判断，当前缓存数组arr的三个值是否都相同。
        nums = nums.sort((a,b)=>{return a-b })
        let n = nums.length, 
        res = [], 
        arr = [-1,-1,-1]
        
        for(let k = 1 ; k < n - 1 ;++k) {
            if(k > 1 && nums[k] == nums[k-1]){
                let key = -nums[k] * 2 ;
                if(nums[k-1] != nums[k-2] && nums.indexOf(key, k+1) !=-1) {
                    arr[0] = nums[k] , arr[1] = nums[k] , arr[2] = key;
                    res.push(arr.slice(0,3));
                }
                continue;
            }
            let sum = -nums[k],
            i=0,
            j=n-1;
            while(i < k && j > k) {
                let tmp = nums[i] + nums[j] ;
                if(tmp == sum) {
                    if(nums[i]!=arr[0] || nums[k]!=arr[1] || nums[j]!=arr[2]) {    
                        arr[0] = nums[i] , arr[1] = nums[k] , arr[2] = nums[j];
                        res.push(arr.slice(0,3));
                    }
                    ++i,--j;
                    continue;
                }
                tmp > sum ? --j : ++i ;
            }
        }
        return res;
}
console.log(a([-1,0,1,0]))
