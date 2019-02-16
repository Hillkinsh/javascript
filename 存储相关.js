//---------------cookie，localstorage----------------
function putData(name,value) { // 增
  try{
    localStorage.setItem(name,JSON.stringify(value))
  }catch(a){
    window.console&&window.console.log(a)
  }
}
function removeData(name, value) { // 删
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