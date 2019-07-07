let add = require('../test.js')
let time = require('../time.js')
let expect = require('chai').expect

describe('加法函数测试', function  (params) {
    it ('1 add 1 应该等于2', function () {
        expect(add(1, 1)).to.be.equal(2)
    })
})
