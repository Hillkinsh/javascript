function replaceSpace (str) {
  if (!str) return ''
  let result = str.split('')
  for (let i=0; i<result.length; i++) {
    result[i] = result[i] === ' ' ? '%20': result[i]
  }
  return result.join('')
}
console.log(replaceSpace('we are happy.'))