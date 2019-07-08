let sub = require('../../sub.js')
let expect = require('chai').expect

describe('减法运算', function (params) {
    it('2 - 1 should be 1', function () {
        expect(sub(2, 1)).to.be.equal(1)
    })
})
