function Hi (value) {
  this.a = 'a'
  this.b = 'b'
  this.c(value)
}
Hi.prototype.c = function (value) {
  console.log(value)
}

module.exports = exports = Hi
exports.key = 'hahahahahahahh'