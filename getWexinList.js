// 油猴子抓取结果返回。


const openDownloadDialog = (url, fileName) => {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  const aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = fileName;
  aLink.click();
};
const saveTXT = (content, fileName) => {
  const blob = new Blob(['\ufeff' + content], {type: 'text/tet,charset=UTF-8'});
  openDownloadDialog(blob, `${fileName}.txt`);
}

function getVal(dom, result=[]) {

  for (let i = 0; i < dom.length; i++) {
    if (dom[i].nodeType !== 3) {
      getVal(dom[i].childNodes, result);
    } else {
      if (dom[i].nodeValue && dom[i].nodeValue.indexOf("\n") == 0) {
        result.push(dom[i].nodeValue);
      }
    }
  }
  return result;
}
setTimeout(() => {
  let targetDOM = document.getElementsByClassName('table_wrp')[0];
  let result = getVal(targetDOM.childNodes);
  saveTXT(JSON.stringify(result), 'result')
},1000);