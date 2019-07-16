let expect = require('chai').expect
let assert = require('chai').assert
let {Province, sampleProvinceData, Producer} = require('../province.js')

describe('province', function() { 
    let asia 
    beforeEach(function() {
        asia = new Province(sampleProvinceData())
    })
    it('shortfall', function() {
        assert.equal(asia.shortfall, 5)
    })
    it('profit', function() {
        expect(asia.profit).equal(230)
    })
    // it('shortfall', function() {
    //     expect(asia.shortfall).equal(-6)
    // })
    // it('profit', function() {
    //     expect(asia.profit).equal(292)
    // })

})

describe('no producers', function() {
    let noProducers
    beforeEach(function() {
        const data = {
            name: 'no producers',
            producers: [],
            demand: 30,
            price: 20
        }
        noProducers = new Province(data)
    })
    it('shortfall', function() {
        expect(noProducers.shortfall).equal(30)
    })
    it('profit', function() {
        expect(noProducers.profit).equal(0)
    })
})