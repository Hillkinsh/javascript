// 本篇是对ajax请求的总结。
// 包含了基本请求的post和get请求，以及相应的加token验证部分。

// 创建网络请求对象 XMLHttpRequest
function createReq(){ 
  if(window.XMLHttpRequest){
    return new XMLHttpRequest()
  } else {
    return new ActiveXObject('MSXML2.XMLHTTP')
  }
}
function paramConcatUrl(originurl, params){   
  var urls = originurl.split('#')
  var url = urls[0]
  var rep = url.indexOf('?') == -1 ? '?' : '&'
  var pairs = []
  for(let key in params){
    params[key] && pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))  // key和value都必须用encodeURIComponent编码
  }
  if(pairs.length == 0){
    return tourl(url)
  }else{
    return tourl(url + rep + pairs.join('&'))
  }
  function tourl(url){ 
    if(urls.length > 1){
      return url + '#' + urls.slice(1).join('#')
    }else{
      return url
    }
  }
}
let addHeader = headers => xhr => { // 添加请求头
  for (let key in headers) {
    headers[key] && xhr.setRequestHeader(key, headers[key])
  }
}

function getJSON (url, params, addHeader) { // get 请求。
  return new Promise(function (resolve, reject) {
      
    let xhr = createReq()
    xhr.onreadystatechange = function() {// 这个方法要先于open创建，目的是为了保证兼容性。
      // 函数内部使用的是xhr对象，而非this对象。
      // 原因就是：有的浏览器会导致函数执行失败，或者函数出错。因此使用xhr对象实例变量是一个可靠的方式。
        
      if (xhr.readyState == 4 ) {
        if (xhr.status == 200) {
          try{
            resolve(JSON.parse(xhr.responseText))
          } catch (e) {
            reject(e)
          } 
        } else {
          reject(xhr)
        }
      } 
    }
    xhr.open("GET", paramConcatUrl(url, params), true);
    if (addHeader) {
      addHeader(xhr)
    }
    xhr.send(null);
  })
}
function getJSONWithToken (url, params) { // 加token的get请求
  // get token .TODO: 取token
  let Authorization

  return getJSON(url, params, addHeader({
    'Authorization': Authorization // token授权
  }))
}
function postJSON (url, params, addHeader) { // post 请求
  return new Promise( function(resolve, reject) {
    let xhr = createReq()
    xhr.open("POST", url, true)
    // xhr.timeout = 4000 //  超时
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 ) {
        if (xhr.status == 504) {
          // 网关超时
          reject(xhr)
        } else if (xhr.status == 200) {
          try {
            resolve(JSON.parse(xhr.responseText)) // 成功。
          } catch (e) {
            reject(e)
          }
        } else {
          reject(xhr) // 失败
        }
      } 
    }

    xhr.onload = function () {} // 请求发送完成
    // xhr.ontimeout = function (e) {} // 超时调用

    addHeader && addHeader(xhr)

    let str = ''
    for (let key in params) {
      str = str + '&' + key + '=' +obj[key]
    }
    xhr.send(str.slice(1))
  })
}
function postJSONWithToken (url, params) {
  let Authorization
  return postJSON(url, params, addHeader({
    'Authorization': Authorization // token授权
  }))
}
 
function postJSONtoJSON (url, params, addHeader) {
  return new Promise( function(resolve, reject) {
    let xhr = createReq()
    xhr.open("POST", url, true)
    // xhr.timeout = 4000 //  超时
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 ) {
        if (xhr.status == 504) {
          // 网关超时
          reject(xhr)
        } else if (xhr.status == 200) {
          try {
            resolve(JSON.parse(xhr.responseText)) // 成功。
          } catch (e) {
            reject(e)
          }
        } else {
          reject(xhr) // 失败
        }
      } 
    }
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8"); //设置传JSON格式

    xhr.onload = function () {} // 请求发送完成
    // xhr.ontimeout = function (e) {} // 超时调用

    addHeader && addHeader(xhr)
    
    xhr.send(JSON.stringify(params))
  })
}
function postJSONtoJSONWithToken (url, params, addHeader) {
  let Authorization
  return postJSONtoJSON(url, params, addHeader({
    'Authorization': Authorization // token授权
  }))
}

export default {
  getJSON,
  getJSONWithToken,
  postJSONtoJSON,
  postJSONtoJSONWithToken
}