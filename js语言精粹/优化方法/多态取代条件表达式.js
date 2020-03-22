function plumages (birds) {
  return new Map(birds.map(b => [b.name, plumage(b)]))
}
function speeds (birds) {
  return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]))
}

function plumage (bird) {
  return createBird(bird).plumage
}

function airSpeedVelocity (bird) {
  return createBird(bird).airSpeedVelocity
}

function createBird (bird) {
  switch (bird.type) {
    case 'EuropeanSwallow': 
      return new EuropeanSwallow(bird)
    case 'AfricanSwallow':
      return new AfricanSwallow(bird)
    case 'NorwegianBlueParrot':
      return new NorwegianBlueParrot(bird)
    default:
      return new Bird(bird)
  }
}
class Bird {
  constructor (birdObject) {
    this.bird = Object.assign({}, birdObject)
  }
  get plumage () {
    return 'unknown'
  }
  get airSpeedVelocity () {
    return null
  }
}

class EuropeanSwallow extends Bird {
  get plumage () {
    return 'average'
  }
  get airSpeedVelocity () {
    return 35
  }
}
class AfricanSwallow extends Bird {
  get plumage () {
    return (this.bird.numerOfCoconuts > 2) ? 'tired' : 'average'
  }
  get airSpeedVelocity () {
    return 40 - 2 * this.bird.numerOfCoconuts
  }
}
class NorwegianBlueParrot extends Bird {
  get plumage () {
    return (this.bird.voltage > 100) ? 'scorched' : 'beautiful'
  }
  get airSpeedVelocity () {
    return (this.bird.isNailed) ? 0 : 10 + this.bird.voltage / 10
  }
}

let myBirds = [
  {type: 'EuropeanSwallow', name: 'a', numerOfCoconuts: 15},
  {type: 'AfricanSwallow', name: 'b', numerOfCoconuts: 25},
  {type: 'NorwegianBlueParrot', name: 'c', numerOfCoconuts: 35, voltage: 40},
  {type: 'panda', name: 'd', numerOfCoconuts: 45}
]
// console.log(plumages(myBirds))
// console.log(speeds(myBirds))

