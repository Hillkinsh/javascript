// load 插件/插件的挂载
/**
 * 插件的来源有3种：
 * 1.应用配置（app） 比如 demo/config/plugin.default
 * 2.框架本身（egg） 比如 node_modules/egg/config/plugin.default
 * 3.命令行传参和options等
 * 
 * 逻辑处理： 拿到这些插件之后 把他们都加到 this.allPlugins上。
 * 从这些全部插件中，挑出enable的，插件放到enabledPluginNames数组中
 * 排序
 * this.plugins = .enablePlugins
 */
function loadPlugin() {

  // loader plugins from application 
  const appPlugins = this.readPluginConfigs(path.join(this.options.baseDir, 'config/plugin.default'));

  // loader plugins from framework 比如：node_modules/egg/config/plugin.default
  const eggPluginConfigPaths = this.eggPaths.map(eggPath => path.join(eggPath, 'config/plugin.default'));
  const eggPlugins = this.readPluginConfigs(eggPluginConfigPaths);

  // loader plugins from process.env.EGG_PLUGINS 在命令行参数传入的插件
  let customPlugins;
  if (process.env.EGG_PLUGINS) {
    try {
      customPlugins = JSON.parse(process.env.EGG_PLUGINS);
    } catch (e) {
      debug('parse EGG_PLUGINS failed, %s', e);
    }
  }

  this.allPlugins = {};
  this.appPlugins = appPlugins;
  this.customPlugins = customPlugins;
  this.eggPlugins = eggPlugins;

  this._extendPlugins(this.allPlugins, eggPlugins);
  this._extendPlugins(this.allPlugins, appPlugins);
  this._extendPlugins(this.allPlugins, customPlugins);

  const enabledPluginNames = []; // enabled plugins that configured explicitly
  const plugins = {};
  const env = this.serverEnv;
  for (const name in this.allPlugins) {
    const plugin = this.allPlugins[name];

    // resolve the real plugin.path based on plugin or package
    // 获取依赖的包的路径，比如egg-error： /Users/xqs/Documents/git/egg-demo/node_modules/egg-onerror
    plugin.path = this.getPluginPath(plugin, this.options.baseDir);

    // read plugin information from ${plugin.path}/package.json
    this.mergePluginConfig(plugin);

    // disable the plugin that not match the serverEnv
    if (env && plugin.env.length && !plugin.env.includes(env)) {
      this.options.logger.info('Plugin %s is disabled by env unmatched, require env(%s) but got env is %s', name, plugin.env, env);
      plugin.enable = false;
      continue;
    }

    plugins[name] = plugin;
    if (plugin.enable) {
      enabledPluginNames.push(name);
    }
  }

  // retrieve the ordered plugins
  this.orderPlugins = this.getOrderPlugins(plugins, enabledPluginNames, appPlugins);

  const enablePlugins = {};
  for (const plugin of this.orderPlugins) {
    enablePlugins[plugin.name] = plugin;
  }

  this.plugins = enablePlugins; // 所有enable的插件

},