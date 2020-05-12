// 全局应用对象。全局只有一个，在应用启动时创建
let appParamsS = Symbol()
module.exports = {
    appMtd () {
        let text = 'an app method here.'
        console.log(text)
        return text
    },
    get appParams () {
        return this[appParamsS]
        ? this[appParamsS]
        : this[appParamsS] = 'hello application'
    }
}

