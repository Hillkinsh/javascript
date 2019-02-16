//---------------cookie，localstorage----------------
// localStorge 是做一些存储比较理想的地方，比cookie大，关闭会话后依然会保存。
function putData(name,value) { // 增
  try{
    localStorage.setItem(name,JSON.stringify(value))
  }catch(a){
    window.console&&window.console.log(a)
  }
}
function removeData(name) { // 删
  try{
    localStorage.removeItem(name)
  }catch(a){
    window.console&&window.console.log(a)
  }
}
function clearData() { // 全删
  localStorage.clear()
}
function getData(name){ // 查
  try{
    return JSON.parse(localStorage.getItem(name))
  }catch(a){
    window.console&&window.console.log(a)
  }
}

// ----------cookie---------------
function setCookie(name,val,day){
  if(day == 0){
    document.cookie = name + "="+ escape(val) + ";path=/;expires=Sat Feb 01 5000 01:01:00 GMT"
  }else{
    let more = new Date()
    more.setTime(more.getTime() + day*24*60*60*1000)
    document.cookie = name + "="+ escape (val) + ";path=/;expires=" + more.toGMTString()
  }
}
function getCookie(name){
  let arr,
  reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)")
  if(arr=document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return ''
  }
}

export default {
  putData,
  getData,
  removeData,
  clearData,
  setCookie,
  getCookie
}