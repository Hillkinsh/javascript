// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx
    const page = ctx.query.page || 1;
    let newsList = [
      {
        url: '##1',
        title: 'hello world'
      },
      {
        url: '##2',
        title: 'hello world2'
      },
      {
        url: '##3',
        title: 'hello world3'
      },
    ]
    let extendWord = this.app.appMtd()
    let extendCtxwd = this.ctx.foo()
    let newsListData = await ctx.service.news.list(page);

    newsListData = JSON.parse(newsListData)
    await ctx.render('news/list.ejs', { list: newsList, newsListData, extendWord, extendCtxwd});
  }
}

module.exports = NewsController;

