function sleep(timeout) {
  let t
  let res
  let out = new Promise((resolve, reject) => {
    res = resolve
    t = setTimeout(() => resolve(console.log('abc')), timeout)
  })
  out.resolve =  () => {
    clearTimeout(t)
    res(console.log('abc'))
  }
  return out
}
sleep(3000)
sleep(3000).resolve()
sleep.resolve()


async function sleep() {
  let res = await axios.get("url").catch(function(err){
    throw new Error(err)
  })
  return res
}