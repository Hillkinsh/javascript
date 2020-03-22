function distanceTravelled (scenario, time) {
  let result
  const primaryAccelation = scenario.primaryForce / scenario.delay
  let primaryTime = Math.min(time, scenario.delay)
  result = 0.5 * primaryAccelation * primaryTime * primaryTime
  let secondaryTime = time - scenario.delay
  if (secondaryTime) {
    let primaryVelocity = primaryAccelation * scenario.delay
    const secondaryAccelation = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass
    result += primaryVelocity * secondaryTime + 0.5 * secondaryAccelation * secondaryTime * secondaryTime
  }
  return result
}