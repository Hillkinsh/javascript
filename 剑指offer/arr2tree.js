let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 5, name: '部门5', pid: 4},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
 
]

function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem =  itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}
function arr2Tree(items) {
  let result = [];
  let mapObj = {};
  for (let i = 0; i < items.length; i++) {
    const id = items[i].id;
    mapObj[id] = {
      ...items[i],
      children: []
    }
  }
  for (let i = 0; i < items.length; i++) {
    const id = items[i].id;
    const pid = items[i].pid;
    if (pid !== 0) {
      mapObj[pid].children.push({
        ...mapObj[id]
      });
    } else {
      result.push(mapObj[id]);
    }
  }
  return result;
}
let result = arr2Tree(arr);
console.log(JSON.stringify(result))