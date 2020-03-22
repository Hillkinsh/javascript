// 任何有返回值的函数，都不应该有看得到的副作用 -- 命令与查询分离

function alertForMiscreant (people) {
  for (const p of people) {
    if (p == 'Don') {
      setOffAlarms()
      return 'Don'
    }
    if (p == 'John') {
      setOffAlarms()
      return 'John'
    }
  }
  return ''
}
function setOffAlarms() {}

function findForMiscreant (people) {
  for (const p of people) {
    if (p == 'Don') {
      return 'Don'
    }
    if (p == 'John') {
      return 'John'
    }
  }
  return ''
}

const found = find(['xiaobai', 'xiaohei', 'Don'])

function alertForMiscreant (people) {
  for (const p of people) {
    if (p == 'Don') {
      setOffAlarms()
      return 
    }
    if (p == 'John') {
      setOffAlarms()
      return 
    }
  }
  return 
}
console.log(found)