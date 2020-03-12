let reading = {
  customer: 'ivan',
  quality: 10,
  month: 5,
  year: 2017
}

function acquireReading() {
  return Object.assign({}, reading)
}

// end 1\
{
  const rawReading = acquireReading()
  const aReading = new Reading(rawReading)
  const baseCharge = aReading.baseCharge
}
// end 2
{
  const rawReading = acquireReading()
  const aReading = new Reading(rawReading)
  const taxableCharge = aReading.taxableCharge
}
// end 3
{
  const rawReading = acquireReading()
  const aReading = new Reading(rawReading)
  const baseChargeAmount = aReading.baseCharge

  function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quality
  }
}

class Reading {
  constructor(data) {
    this._customer = data.customer
    this._quality = data.quality
    this._month = data.month
    this._year = data.year
  }
  get customer() {
    return this._customer
  }
  get quality() {
    return this._quality
  }
  get month() {
    return this._month
  }
  get year() {
    return this._year
  }
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quality
  }
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(aReading.year))
  }
}