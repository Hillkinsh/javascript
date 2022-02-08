function foo(nums1, nums2) {
  let result = [];
  let targetObj = {};
  for (let i = 0; i < nums1.length; i++) {
    targetObj[nums1[i]] = 1;
  }
  for (let i = 0; i < nums2.length; i++) {
    if (targetObj[nums2[i]]) {
      result.push(nums2[i]);
    }
  }
  return result;
}
let nums1 = [1,6,2,1], nums2 = [2,2];
foo(nums1, nums2);
nums1 = [7,3,5], nums2 = [3,7,3,8,7];
foo(nums1, nums2);

const config = {
  limitLength: 10, // 订单长度限制，
  drink: { // 饮品价格
    yeguo: 10,
    ximi: 10,
    honey: 12,
    almond: 14,
    uscoffee: 11,
    latte: 12
  },
  material: { // 小料价格
    redBean: 2,
    taroBalls: 2,
    olio: 4,
    cheese: 5
  },
  itemLength: 1, // 饮品最多能加几分料
  mustRelationship: { // 饮品和小料唯一关系
    uscoffee: "cheese",
    latte: "cheese"
  },
  noRelationship: ["olio", "cheese"], // 小料之间的互斥关系
};

function bar (arr) {
  // 基本不合法检测；
  if (!arr || !arr.length || arr.length > config.limitLength) {
    return -1;
  }

  // 检验订单“每杯饮品每种料最多加一份”；
  if (!isHasOnlyOneMaterial(arr)) {
    return -1;
  }

  // 检验订单的互斥关系；
  if (!isAllDataLegal(arr)) {
    return -1;
  }
  let output = {
    total: 0,
    list: [],
  }
  for (let i = 0; i < arr.length; i++) {
    output.total += countVal(arr[i][0]) + countVal(arr[i][1]);
    output.list.push([
      {
        source: arr[i],
        count: countVal(arr[i][0]) + countVal(arr[i][1])
      }
    ]);
  }
  return output;
}

// 计算当前输入的价值

function countVal (str) {
  return config.drink[str] || config.material[str] || 0;
}
// 检验订单“每杯饮品每种料最多加一份”；
function isHasOnlyOneMaterial (arr) {
  for (let i = 0; i < arr.length; i++) {
    // 没有购买饮品 或者 饮品里面加的是饮品
    if (!config.drink[arr[i][0]] || config.drink[arr[i][1]]) {
      return false;
    }
    // 小料买的过多
    if (arr[i].length > config.itemLength + 1) {
      return false;
    }
  }
  return true;
}

// 检验订单的互斥关系
function isAllDataLegal(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (config.noRelationship.includes(arr[i][1]) && !result.includes(arr[i][1])) {
      result.push(arr[i][1]);
      if (result.length > 1) {
        return false
      }
    }
  }
  return true;
}


let input = [
  ["yeguo", "redBean"],
  ["ximi"],
  ["honey", "taroBalls"],
  ["almond", "olio"],
  ["latte"],
]
console.log(JSON.stringify(bar(input)));