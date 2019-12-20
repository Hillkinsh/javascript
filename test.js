function getAsync() {
  return new Promise(function (resolve, reject) {
    reject('hahaha')
  })
}

async function testAsync() {
  let res = await getAsync().catch(err => console.log(err))
}

testAsync()