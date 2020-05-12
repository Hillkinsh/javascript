// app/router.js

module.exports = app => {
    const { router, controller } = app;
    const robot = app.middleware.robot({ ua: [
      /Baiduspider/i,
    ] });
    router.get('/', controller.home.index);
    router.get('/news', robot, controller.news.list);
    router.post('createPost', '/api/posts', controller.sub.test.create);
    router.get('/npm', controller.npm.index);
  };
