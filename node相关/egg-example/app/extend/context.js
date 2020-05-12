// context 是请求级别的对象。每次请求生成一个context实例

// 访问方式：
// 1. middleware中，this = this.ctx 
// 2. 其他地方都用this.ctx 即可

module.exports = {
    foo () {
        console.log(`hello world. `)
        return this.keyInCtx
    },
    get keyInCtx () {
        return 'kkkkk in context.'
    }
}