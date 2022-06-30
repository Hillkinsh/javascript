const longComputation = () => {
  let sum = 0;
  for (let i = 0; i< 1e10; i++) {
    sum += i
  }
}

process.on('message', (msg) => {
  const sum = longComputation();
  process.send(sum)
})