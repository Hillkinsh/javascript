// app/service/news.js
const Service = require('egg').Service;
let API = (baseUrl, pageSize) => `${baseUrl}/cloud-company-background/construct/getRegHumanList`

class NewsService extends Service {
  async list(page = 1) {
      const { serverUrl, pageSize=5 } = this.config.news
      this.app.httpclient.on('request', req => {
        req.url //请求 url
        req.ctx //是发起这次请求的当前上下文
        console.log('hello world: ' + req.url)
        console.log(req.ctx)
        // 可以在这里设置一些 trace headers，方便全链路跟踪
      });
      let { data } = await this.ctx.curl(`${API(serverUrl, pageSize)}`, {
        pageSize: pageSize,
        type: 0,
        pageNum:1,
        gid: 'b6bc016381'
      });
      data = data.toString('utf8')
      return data

  }
}

module.exports = NewsService;