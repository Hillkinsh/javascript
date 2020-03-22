let hasProxy = new Proxy({}, {
  has(target, proxyKey) {
    console.log('has option')
    return proxyKey in target
  }
})

hasProxy['hello'] = 'world'
console.log('hell' in hasProxy)