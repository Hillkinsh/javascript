
## 继承关系

1. Applocation = egg.Application (egg/lib/application.js)

2. egg.Application extends EggApplication (egg/lib/egg.js)

3. EggApplication extends egg-core.EggCore（egg-core/lib/egg.js)

4. egg-core.EggCore extends koa

## 2.在EggCore中，重要的事情做了两个：

+ 生命周期 this.lifecycle
+ this.loader = new Loader({options})

> 他完成了loader的初始化。给loader上插上了 plugin/config/extend/custom/service/middleware/controller/router/custom_loader 等mixin 方法.

> 这个loader的挂法很巧，在不同的地方可以挂不同的loader

## 3.在EggApplication中，做的事情：

+ this.loader.loadConfig();

dump

> 解决了eggjs 为什么在服务启动后，会自动加载，将项目路径下的router.js, controller/**.js, 以及service/**.js绑定到 app 实例上



get [EGG_LOADER]() {
  return AppWorkerLoader;
}
但不妨碍理解功能：那个loader作用是 加载所有的Plugin ,然后加载所有的Config.

  loadConfig() {
    this.loadPlugin();
    super.loadConfig();
  }


2。

