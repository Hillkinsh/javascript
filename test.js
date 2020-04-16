// 实现一个方法，拆解 URL 参数中的 queryString
// 入参格式参考：
const url = 'http://sample.com/?a=1&b=2&c=xx&d#hash';
// 出参格式参考：
const result = { a: '1', b: '2', c: 'xx', d: '' };
/*拆解URL参数中queryString，返回一个 key - value 形式的 object*/
function querySearch(url) {
  let result = {}
  if (!url || url.indexOf('?') === -1) return result
  let str = url.split('?')[1]
  str = str.split('#')[0]

  let arr = str.split('&')
  for (let i = 0; i< arr.length; i++) {
    let value = arr[i].split('=')
    result[value[0]] = value[1] || '' 
  }
  return result
}
querySearch(url)