function validWordsLength (name) {
  var count = 0
  for (var i = 0; i < name.length; i++) {
    if (name[i].match(/[\u4e00-\u9fa5]/g) || name[i]=== "（" || name[i] === '）') {
      count += 1
    } else {
      count += 0.5
    }
  }
  return count
}
function withAfter(listArr) {
  let list = listArr && listArr.slice() || [];
  let accum = 0;
  for (var i = 0; i < list.length; i++) {
    accum += validWordsLength(list[i].investor_name)
    console.log(accum, list[i].investor_name)
    if (accum <= 11) {
      if (accum != validWordsLength(list[i].investor_name)) {
        list[i].before = true;
        accum = 0
      }
    } else {
      accum = 0
    }
  }
  return list
}

let list = [{
  "investor_name":"腾讯投资",
  "investor_id":"ba2bb2988",
  "id":"ba2bb2988",
  "company":"腾讯投资"
},{
  "investor_name":"Oppenheimer",
  "company":"Oppenheimer"
},{
  "investor_name":"Landsdowne",
  "investor_id":"b9517372135",
  "id":"b9517372135",
  "company":"Landsdowne"
},{
  "investor_name":"Dasarna",
  "company":"Dasarna"
},{
  "investor_name":"中国国有企业结构调整基金",
  "investor_id":"bcc0015939",
  "id":"bcc0015939",
  "company":"中国国有企业结构调整基金"
},{
  "investor_name":"加华资本",
  "investor_id":"be19510371",
  "id":"be19510371",
  "company":"加华资本"
}]

console.log(withAfter(list))