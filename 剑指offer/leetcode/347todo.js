/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
  var topKFrequent = function(nums, k) {
    const map = new Map();
    
    for(const num of nums) {
      map.set(num, (map.get(num) || 0) + 1);
    }

    // 创建小顶堆
    const priorityQueue = new PriorityQueue((a, b) => a[1] - b[1]);

    // entry 是一个长度为2的数组，0位置存储key，1位置存储value
    for (const entry of map.entries()) {
      priorityQueue.push(entry);
      if (priorityQueue.size() > k) {
        priorityQueue.pop();
      }
    }

    const ret = [];

    for(let i = priorityQueue.size() - 1; i >= 0; i--) {
      ret[i] = priorityQueue.pop()[0];
    }

    return ret;
  };

  // 小顶堆
  // function PriorityQueue(compareFn) {
  //   this.compareFn = compareFn;
  //   this.queue = [];
  // }

  // // 使用传入的 compareFn 比较两个位置的元素
  // PriorityQueue.prototype.compare = function(index1, index2) {
  //   if (this.queue[index1] === undefined) {
  //     return 1;
  //   }
  //   if (this.queue[index2] === undefined) {
  //     return -1;
  //   }
  //   return this.compareFn(this.queue[index1], this.queue[index2]);
  // }

  // PriorityQueue.prototype.size = function() {
  //   return this.queue.length;
  // }

  // // 获取堆顶元素并移除
  // PriorityQueue.prototype.pop = function() {
  //   const ret = this.queue[0]; // 小顶堆的跟元素一定是最小的。

  //   // 把最后一个节点移到堆顶
  //   this.queue[0] = this.queue.pop();

  //   let index = 0;
  //   // 左子节点下标，left + 1 就是右子节点下标
  //   let left = 1;
  //   let selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;

  //   // 下沉
  //   while(selectedChild !== undefined && this.compare(index, selectedChild) > 0) {
  //     // 交换
  //     [this.queue[index], this.queue[selectedChild]] = [this.queue[selectedChild], this.queue[index]];
  //     index = selectedChild;
  //     left = 2 * index + 1;
  //     selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
  //   }

  //   return ret;
  // }

  // // 添加
  // PriorityQueue.prototype.push = function(item) {
  //   this.queue.push(item);
  //   let index = this.queue.length - 1;
  //   let parent = Math.floor((index - 1) / 2);
  //   // 上浮
  //   while(parent >= 0 && this.compare(parent, index) > 0) {
  //     // 交换
  //     [this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]];
  //     index = parent;
  //     parent = Math.floor((index - 1) / 2);
  //   }
  // }

  // var nums = [1,1,1,2,2,3,3,3,33,3,3,4,4,4,4,4,4,4], k = 2;

  // console.log(topKFrequent(nums, k));


  // max-heapify 算法：维护最大堆算法。
  // 对于一个数组和一个下标i，在调用max-heapify时，跟节点的左右子树都是最大堆，而节点本身可能违背。
  // 算法通过将a[i]的值逐级下降，从而维护了最大堆。

  function maxHeapify(A, i) {
    const l = i * 2 + 1;
    const r = (i + 1) * 2;
    let largest;
    if (l <= A.length && A[l] > A[i]) {
      largest = l
    } else {
      largest = i;
    }
    if (r <= A.length && A[r] > A[largest]) {
      largest = r;
    }
    if(largest !== i) {
      [A[i], A[largest]] = [A[largest], A[i]];
      maxHeapify(A, largest)
    }
  }

  function maxHeapCur(A, i) {
    while(i < A.length) {
      console.log(i , "......")
      const l = 2 * i + 1;
      const r = 2 * (i + 1);
      let largest;
      if (l >= A.length || r >= A.length) {
        break;
      }
      if (l < A.length && A[i] < A[l]) {
        largest = l;
      } else {
        largest = i;
      }
      if (r < A.length && A[r] > A[largest]) {
        largest = r;
      }
      console.log('arg:', largest)
      if (largest !== i) {
        console.log('i, largest:', i, largest)
        const tmp = A[i];
        A[i] = A[largest];
        A[largest] = tmp;
        // [A[i], A[largest]] = [A[largest], A[i]];
        i = largest;
      }
    }
  }

  const A = [16, 4,10,14,7,9,3,2,8,1], i=1;
  const B = [16, 4,10,14,7,9,3,2,8,1], j=1;

  // maxHeapify(A, i);
  // console.log(A);
  // maxHeapCur(B, j);
  // console.log(B);

  // 小顶堆算法
  
  class MyPriorityQueue {
    constructor(compare) {
      this.compare = compare;
      this.queue = [];
    }
    minHeapify(A, i) {
      while(i < A.length) { // len == 3
        const l = 2 * i + 1; // 1
        const r = 2 * (i + 1); // 2
        if (l >= A.length || r > A.length) break;
        let min;
        if (l < A.length && this.compare(A[i], A[l]) > 0) {
          min = l;
        } else {
          min = i;
        }
        if (r < A.length && this.compare(A[r], A[min]) > 0) {
          min = r;
        }
        if (min !== i) {
          const tmp = A[i];
          A[i] = A[min];
          A[min] = tmp;
          i = min;
        } else {
          break;
        }
      }
    }
    push(x) {
      this.queue.push(x);
      let i = this.queue.length - 1; // 3
      let p = Math.floor((i - 1) / 2); // 1
      while(p >= 0 && this.compare(this.queue[p], this.queue[i]) > 0) {
        [this.queue[p], this.queue[i]] = [this.queue[i], this.queue[p]];
        i = p;
        p = i - 2 > 0 ? Math.floor((i - 2) / 2) : Math.ceil((i - 2) / 2);
      }
      console.log('finish push.', this.queue)
    }
    pop() {
      let ret = this.queue[0];
      this.queue[0] = this.queue.pop();
      this.minHeapify(this.queue, 0);
      return ret;
    }
    getQue() {
      return this.queue;
    }
  }
  var topKFrequent = function (nums, k) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      let tmp = nums[i];
      map.set(tmp, (map.get(tmp) || 0) + 1);
    }
    const priorityQueue = new MyPriorityQueue((a, b) => {
      return map.get(a) - map.get(b);
    });
    console.log('map:', map)
    let count = 0;
    map.forEach(function(value, key) {
      priorityQueue.push(key);
      if (count >= k) {
        priorityQueue.pop();
      }
      count++;
    });
    return priorityQueue.getQue();
  }


  var nums = [1,1,1,2,2,3,3,3,33,3,3,4,4,4,4,4,4,4], k = 2;
  var nums = [5,5,5,5,3,3,1,1,1,3,5,73,1], k = 3;
  var nums = [-1,1,4,-4,3,5,4,-2,3,-1], k = 3;

  console.log(topKFrequent(nums, k));