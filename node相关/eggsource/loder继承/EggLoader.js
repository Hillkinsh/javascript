class EggLoader {
  /**
   * @class
   * @param {Object} options - options
   * @param {String} options.baseDir - the directory of application
   * @param {EggCore} options.app - Application instance
   * @param {Logger} options.logger - logger
   * @param {Object} [options.plugins] - custom plugins
   * @since 1.0.0
   */
  constructor(options) {
    this.options = options;

    this.app = this.options.app;
    this.lifecycle = this.app.lifecycle;
    this.timing = this.app.timing || new Timing();
    this[REQUIRE_COUNT] = 0;

    this.pkg = utility.readJSONSync(path.join(this.options.baseDir, 'package.json'));
    this.eggPaths = this.getEggPaths();
    this.serverEnv = this.getServerEnv();
    this.appInfo = this.getAppInfo();
    this.serverScope = options.serverScope !== undefined
      ? options.serverScope
      : this.getServerScope();
  }
  getServerEnv() {
    let serverEnv = this.options.env;

    const envPath = path.join(this.options.baseDir, 'config/env');
    if (!serverEnv && fs.existsSync(envPath)) {
      serverEnv = fs.readFileSync(envPath, 'utf8').trim();
    }

    if (!serverEnv) {
      serverEnv = process.env.EGG_SERVER_ENV;
    }

    if (!serverEnv) {
      if (process.env.NODE_ENV === 'test') {
        serverEnv = 'unittest';
      } else if (process.env.NODE_ENV === 'production') {
        serverEnv = 'prod';
      } else {
        serverEnv = 'local';
      }
    } else {
      serverEnv = serverEnv.trim();
    }

    return serverEnv;
  }
  getServerScope() {
    return process.env.EGG_SERVER_SCOPE || '';
  }
  getAppname() {
    if (this.pkg.name) {
      debug('Loaded appname(%s) from package.json', this.pkg.name);
      return this.pkg.name;
    }
    const pkg = path.join(this.options.baseDir, 'package.json');
    throw new Error(`name is required from ${pkg}`);
  }
  getHomedir() {
    // EGG_HOME for test
    return process.env.EGG_HOME || homedir() || '/home/admin';
  }

  getAppInfo() {
    const env = this.serverEnv;
    const scope = this.serverScope;
    const home = this.getHomedir();
    const baseDir = this.options.baseDir;
    return {
      /**
       * The name of the application, retrieve from the name property in `package.json`.
       * @member {String} AppInfo#name
       */
      name: this.getAppname(),

      /**
       * The current directory, where the application code is.
       * @member {String} AppInfo#baseDir
       */
      baseDir,

      /**
       * The environment of the application, **it's not NODE_ENV**
       *
       * 1. from `$baseDir/config/env`
       * 2. from EGG_SERVER_ENV
       * 3. from NODE_ENV
       *
       * env | description
       * ---       | ---
       * test      | system integration testing
       * prod      | production
       * local     | local on your own computer
       * unittest  | unit test
       *
       * @member {String} AppInfo#env
       * @see https://eggjs.org/zh-cn/basics/env.html
       */
      env,

      /**
       * @member {String} AppInfo#scope
       */
      scope,

      /**
       * The use directory, same as `process.env.HOME`
       * @member {String} AppInfo#HOME
       */
      HOME: home,

      /**
       * parsed from `package.json`
       * @member {Object} AppInfo#pkg
       */
      pkg: this.pkg,

      /**
       * The directory whether is baseDir or HOME depend on env.
       * it's good for test when you want to write some file to HOME,
       * but don't want to write to the real directory,
       * so use root to write file to baseDir instead of HOME when unittest.
       * keep root directory in baseDir when local and unittest
       * @member {String} AppInfo#root
       */
      root: env === 'local' || env === 'unittest' ? baseDir : home,
    };
  }

  getEggPaths() {
    // avoid require recursively
    const EggCore = require('../egg');
    const eggPaths = [];

    let proto = this.app;

    // Loop for the prototype chain
    while (proto) {
      proto = Object.getPrototypeOf(proto);
      // stop the loop if
      // - object extends Object
      // - object extends EggCore
      if (proto === Object.prototype || proto === EggCore.prototype) {
        break;
      }

      assert(proto.hasOwnProperty(Symbol.for('egg#eggPath')), 'Symbol.for(\'egg#eggPath\') is required on Application');
      const eggPath = proto[Symbol.for('egg#eggPath')];
      assert(eggPath && typeof eggPath === 'string', 'Symbol.for(\'egg#eggPath\') should be string');
      assert(fs.existsSync(eggPath), `${eggPath} not exists`);
      const realpath = fs.realpathSync(eggPath);
      if (!eggPaths.includes(realpath)) {
        eggPaths.unshift(realpath);
      }
    }

    return eggPaths;
  }

  loadFile(filepath, ...inject) {
    filepath = filepath && this.resolveModule(filepath);
    if (!filepath) {
      return null;
    }

    // function(arg1, args, ...) {}
    if (inject.length === 0) inject = [ this.app ];

    let ret = this.requireFile(filepath);
    console.log((ret))
    if (is.function(ret) && !is.class(ret)) {
      ret = ret(...inject); // inject == app
    }
    return ret;
  }

  requireFile(filepath) {
    const timingKey = `Require(${this[REQUIRE_COUNT]++}) ${utils.getResolvedFilename(filepath, this.options.baseDir)}`;
    this.timing.start(timingKey);
    const ret = utils.loadFile(filepath);
    this.timing.end(timingKey);
    return ret;
  }

  getLoadUnits() {
    if (this.dirs) {
      return this.dirs;
    }

    const dirs = this.dirs = [];

    if (this.orderPlugins) {
      for (const plugin of this.orderPlugins) {
        dirs.push({
          path: plugin.path,
          type: 'plugin',
        });
      }
    }

    // framework or egg path
    for (const eggPath of this.eggPaths) {
      dirs.push({
        path: eggPath,
        type: 'framework',
      });
    }

    // application
    dirs.push({
      path: this.options.baseDir,
      type: 'app',
    });

    debug('Loaded dirs %j', dirs);
    return dirs;
  }

  /**
   * Load files using {@link FileLoader}, inject to {@link Application}
   * @param {String|Array} directory - see {@link FileLoader}
   * @param {String} property - see {@link FileLoader}
   * @param {Object} opt - see {@link FileLoader}
   * @since 1.0.0
   */
  loadToApp(directory, property, opt) {
    // 将某个属性加载到app
    const target = this.app[property] = {};
    opt = Object.assign({}, {
      directory,
      target,
      inject: this.app,
    }, opt);

    const timingKey = `Load "${String(property)}" to Application`;
    this.timing.start(timingKey);
    new FileLoader(opt).load();
    this.timing.end(timingKey);
  }

  /**
   * Load files using {@link ContextLoader}
   * @param {String|Array} directory - see {@link ContextLoader}
   * @param {String} property - see {@link ContextLoader}
   * @param {Object} opt - see {@link ContextLoader}
   * @since 1.0.0
   */
  loadToContext(directory, property, opt) {
    opt = Object.assign({}, {
      directory,
      property,
      inject: this.app,
    }, opt);

    const timingKey = `Load "${String(property)}" to Context`;
    this.timing.start(timingKey);
    new ContextLoader(opt).load();
    this.timing.end(timingKey);
  }

  get FileLoader() {
    return FileLoader;
  }

  /**
   * @member {ContextLoader} EggLoader#ContextLoader
   * @since 1.0.0
   */
  get ContextLoader() {
    return ContextLoader;
  }

  getTypeFiles(filename) {
    const files = [ `${filename}.default` ];
    if (this.serverScope) files.push(`${filename}.${this.serverScope}`);
    if (this.serverEnv === 'default') return files;

    files.push(`${filename}.${this.serverEnv}`);
    if (this.serverScope) files.push(`${filename}.${this.serverScope}_${this.serverEnv}`);
    return files;
  }

  resolveModule(filepath) {
    let fullPath;
    try {
      fullPath = require.resolve(filepath);
    } catch (e) {
      return undefined;
    }

    if (process.env.EGG_TYPESCRIPT !== 'true' && fullPath.endsWith('.ts')) {
      return undefined;
    }

    return fullPath;
  }
}