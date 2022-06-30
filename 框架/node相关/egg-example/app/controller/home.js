const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const data = { name: 'egg' };
    await ctx.render('home/index.tpl', data);
    // or manually set render result to ctx.body
    ctx.body = await ctx.renderView('path/to/file.tpl', data);

    // or render string directly
    ctx.body = await ctx.renderString('hi, {{ name }}', data, {
      viewEngine: 'nunjucks',
    });
  }
}

module.exports = HomeController;