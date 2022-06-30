class EggCore extends KoaApplication {

  /**
   * @class
   * @param {Object} options - options
   * @param {String} [options.baseDir=process.cwd()] - the directory of application
   * @param {String} [options.type=application|agent] - whether it's running in app worker or agent worker
   * @param {Object} [options.plugins] - custom plugins
   * @since 1.0.0
   */
  constructor(options = {}) {
    options.baseDir = options.baseDir || process.cwd();
    options.type = options.type || 'application';

    super();

    this.timing = new Timing();
    this[DEPRECATE] = new Map();
    this._options = this.options = options;
    this.console = new EggConsoleLogger();
    this.BaseContextClass = BaseContextClass;
    const Controller = this.BaseContextClass;
    this.Controller = Controller;
    const Service = this.BaseContextClass;
    this.Service = Service;

    this.lifecycle = new Lifecycle({
      baseDir: options.baseDir,
      app: this,
      logger: this.console,
    });
    this.lifecycle.on('error', err => this.emit('error', err));
    this.lifecycle.on('ready_timeout', id => this.emit('ready_timeout', id));
    this.lifecycle.on('ready_stat', data => this.emit('ready_stat', data));

    const Loader = this[EGG_LOADER];
    assert(Loader, 'Symbol.for(\'egg#loader\') is required');
    this.loader = new Loader({
      baseDir: options.baseDir,
      app: this,
      plugins: options.plugins,
      logger: this.console,
      serverScope: options.serverScope,
      env: options.env,
    });
  }
  use(fn) {
    assert(is.function(fn), 'app.use() requires a function');
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(utils.middleware(fn));
    return this;
  }
  get type() {
    return this.options.type;
  }
  get baseDir() {
    return this.options.baseDir;
  }
  get deprecate() {
    const caller = utils.getCalleeFromStack();
    if (!this[DEPRECATE].has(caller)) {
      const deprecate = require('depd')('egg');
      // dynamic set _file to caller
      deprecate._file = caller;
      this[DEPRECATE].set(caller, deprecate);
    }
    return this[DEPRECATE].get(caller);
  }

  get name() {
    return this.loader ? this.loader.pkg.name : '';
  }

  get plugins() {
    return this.loader ? this.loader.plugins : {};
  }

  get config() {
    return this.loader ? this.loader.config : {};
  }

  beforeStart(scope) {
    this.lifecycle.registerBeforeStart(scope);
  }

  ready(flagOrFunction) {
    return this.lifecycle.ready(flagOrFunction);
  }

  readyCallback(name, opts) {
    return this.lifecycle.legacyReadyCallback(name, opts);
  }

  beforeClose(fn) {
    this.lifecycle.registerBeforeClose(fn);
  }

  async close() {
    if (this[CLOSE_PROMISE]) return this[CLOSE_PROMISE];
    this[CLOSE_PROMISE] = this.lifecycle.close();
    return this[CLOSE_PROMISE];
  }

  get router() {
    if (this[ROUTER]) {
      return this[ROUTER];
    }
    const router = this[ROUTER] = new Router({ sensitive: true }, this);
    // register router middleware
    this.beforeStart(() => {
      this.use(router.middleware());
    });
    return router;
  }

  url(name, params) {
    return this.router.url(name, params);
  }

  del(...args) {
    this.router.delete(...args);
    return this;
  }

  get [EGG_LOADER]() {
    return require('./loader/egg_loader');
  }

  toAsyncFunction(fn) {
    if (!is.generatorFunction(fn)) return fn;
    fn = co.wrap(fn);
    return async function(...args) {
      return fn.apply(this, args);
    };
  }

  toPromise(obj) {
    return co(function* () {
      return yield obj;
    });
  }
}
/**
 * 总体上，eggCore做的事情还是比较清晰：
 * 1.初始化基本属性
 * 2.生命周期，
 * 3.loader
 * 
 * 其他的各种属性和方法都是处于初始化的一个属性占位阶段。
 * 比如：Controller， Service
 */