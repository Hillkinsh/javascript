let expect = require('chai').expect
let assert = require('chai').assert
let {Province, sampleProvinceData, Producer} = require('../province.js')

describe('province', function() { 
    let asia 
    beforeEach(function() {
        asia = new Province(sampleProvinceData())
    })
    // it('shortfall', function() {
    //     assert.equal(asia.shortfall, 5)
    // })
    // it('profit', function() {
    //     expect(asia.profit).equal(230)
    // })
    it('shortfall', function() {
        expect(asia.shortfall).equal(-6)
    })
    it('profit', function() {
        expect(asia.profit).equal(292)
    })
})

// describe('change production', function() {
//     let asia 
//     beforeEach(function() {
//         asia = new Province(sampleProvinceData())
//     })

//     asia.producers[0].production = 20
//     it('production')
//     expect(asia.shortfall).equal(-6)
//     expect(asia.profit).equal(292)
// })