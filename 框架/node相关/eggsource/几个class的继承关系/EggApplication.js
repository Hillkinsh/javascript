class EggApplication extends EggCore {

  /**
   * @class
   * @param {Object} options
   *  - {Object} [type] - type of instance, Agent and Application both extend koa, type can determine what it is.
   *  - {String} [baseDir] - app root dir, default is `process.cwd()`
   *  - {Object} [plugins] - custom plugin config, use it in unittest
   *  - {String} [mode] - process mode, can be cluster / single, default is `cluster`
   */
  constructor(options = {}) {
    options.mode = options.mode || 'cluster';
    super(options);

    // export context base classes, let framework can impl sub class and over context extend easily.
    this.ContextCookies = ContextCookies;
    this.ContextLogger = ContextLogger;
    this.ContextHttpClient = ContextHttpClient;
    this.HttpClient = HttpClient;

    this.loader.loadConfig();

    this.messenger = Messenger.create(this);
    this.messenger.once('egg-ready', () => {
      this.lifecycle.triggerServerDidReady();
    });

    this.ready(() => process.nextTick(() => {
      const dumpStartTime = Date.now();
      this.dumpConfig();
      this.dumpTiming();
      this.coreLogger.info('[egg:core] dump config after ready, %s', ms(Date.now() - dumpStartTime));
    }));
    this._setupTimeoutTimer();

    this._unhandledRejectionHandler = this._unhandledRejectionHandler.bind(this);
    process.on('unhandledRejection', this._unhandledRejectionHandler);

    this[CLUSTER_CLIENTS] = [];

    this.cluster = (clientClass, options) => {
      options = Object.assign({}, this.config.clusterClient, options, {
        singleMode: this.options.mode === 'single',
        // cluster need a port that can't conflict on the environment
        port: this.options.clusterPort,
        // agent worker is leader, app workers are follower
        isLeader: this.type === 'agent',
        logger: this.coreLogger,
      });
      const client = cluster(clientClass, options);
      this._patchClusterClient(client);
      return client;
    };

    // register close function
    this.beforeClose(async () => {
      // single process mode will close agent before app close
      if (this.type === 'application' && this.options.mode === 'single') {
        await this.agent.close();
      }

      for (const logger of this.loggers.values()) {
        logger.close();
      }
      this.messenger.close();
      process.removeListener('unhandledRejection', this._unhandledRejectionHandler);
    });

    this.BaseContextClass = BaseContextClass;
    this.Controller = BaseContextClass;
    this.Service = BaseContextClass;
    this.Subscription = BaseContextClass;
    this.BaseHookClass = BaseHookClass;
    this.Boot = BaseHookClass;
  }
  inspect() {
    const res = {
      env: this.config.env,
    };

    function delegate(res, app, keys) {
      for (const key of keys) {
        /* istanbul ignore else */
        if (app[key]) {
          res[key] = app[key];
        }
      }
    }

    function abbr(res, app, keys) {
      for (const key of keys) {
        /* istanbul ignore else */
        if (app[key]) {
          res[key] = `<egg ${key}>`;
        }
      }
    }

    delegate(res, this, [
      'name',
      'baseDir',
      'subdomainOffset',
    ]);

    abbr(res, this, [
      'config',
      'controller',
      'httpclient',
      'loggers',
      'middlewares',
      'router',
      'serviceClasses',
    ]);

    return res;
  }

  toJSON() {
    return this.inspect();
  }
  curl(url, opts) {
    return this.httpclient.request(url, opts);
  }
  get httpclient() {
    if (!this[HTTPCLIENT]) {
      if (this.config.httpclient.enableDNSCache) {
        this[HTTPCLIENT] = new DNSCacheHttpClient(this);
      } else {
        this[HTTPCLIENT] = new this.HttpClient(this);
      }
    }
    return this[HTTPCLIENT];
  }
  get loggers() {
    if (!this[LOGGERS]) {
      this[LOGGERS] = createLoggers(this);
    }
    return this[LOGGERS];
  }
  getLogger(name) {
    return this.loggers[name] || null;
  }
  get logger() {
    return this.getLogger('logger');
  }
  get coreLogger() {
    return this.getLogger('coreLogger');
  }

  _unhandledRejectionHandler(err) {
    if (!(err instanceof Error)) {
      const newError = new Error(String(err));
      // err maybe an object, try to copy the name, message and stack to the new error instance
      /* istanbul ignore else */
      if (err) {
        if (err.name) newError.name = err.name;
        if (err.message) newError.message = err.message;
        if (err.stack) newError.stack = err.stack;
      }
      err = newError;
    }
    /* istanbul ignore else */
    if (err.name === 'Error') {
      err.name = 'unhandledRejectionError';
    }
    this.coreLogger.error(err);
  }
  dumpConfigToObject() {
    let ignoreList;
    try {
      // support array and set
      ignoreList = Array.from(this.config.dump.ignore);
    } catch (_) {
      ignoreList = [];
    }

    const json = extend(true, {}, { config: this.config, plugins: this.plugins });
    utils.convertObject(json, ignoreList);
    return {
      config: json,
      meta: this.loader.configMeta,
    };
  }

  dumpConfig() {
    const rundir = this.config.rundir;
    try {
      /* istanbul ignore if */
      if (!fs.existsSync(rundir)) fs.mkdirSync(rundir);

      // get dumpped object
      const { config, meta } = this.dumpConfigToObject();

      // dump config
      const dumpFile = path.join(rundir, `${this.type}_config.json`);
      fs.writeFileSync(dumpFile, CircularJSON.stringify(config, null, 2));

      // dump config meta
      const dumpMetaFile = path.join(rundir, `${this.type}_config_meta.json`);
      fs.writeFileSync(dumpMetaFile, CircularJSON.stringify(meta, null, 2));
    } catch (err) {
      this.coreLogger.warn(`dumpConfig error: ${err.message}`);
    }
  }

  dumpTiming() {
    try {
      const json = this.timing.toJSON();
      const rundir = this.config.rundir;
      const dumpFile = path.join(rundir, `${this.type}_timing_${process.pid}.json`);
      fs.writeFileSync(dumpFile, CircularJSON.stringify(json, null, 2));
    } catch (err) {
      this.coreLogger.warn(`dumpTiming error: ${err.message}`);
    }
  }

  get [EGG_PATH]() {
    return path.join(__dirname, '..');
  }

  _setupTimeoutTimer() {
    const startTimeoutTimer = setTimeout(() => {
      this.coreLogger.error(`${this.type} still doesn't ready after ${this.config.workerStartTimeout} ms.`);
      this.emit('startTimeout');
    }, this.config.workerStartTimeout);
    this.ready(() => clearTimeout(startTimeoutTimer));
  }

  get env() {
    this.deprecate('please use app.config.env instead');
    return this.config.env;
  }
  /* eslint no-empty-function: off */
  set env(_) {}

  get proxy() {
    this.deprecate('please use app.config.proxy instead');
    return this.config.proxy;
  }
  /* eslint no-empty-function: off */
  set proxy(_) {}

  addSingleton(name, create) {
    const options = {};
    options.name = name;
    options.create = create;
    options.app = this;
    const singleton = new Singleton(options);
    const initPromise = singleton.init();
    if (initPromise) {
      this.beforeStart(async () => {
        await initPromise;
      });
    }
  }

  _patchClusterClient(client) {
    const create = client.create;
    client.create = (...args) => {
      const realClient = create.apply(client, args);
      this[CLUSTER_CLIENTS].push(realClient);
      this.beforeClose(() => cluster.close(realClient));
      return realClient;
    };
  }

  createAnonymousContext(req) {
    const request = {
      headers: {
        host: '127.0.0.1',
        'x-forwarded-for': '127.0.0.1',
      },
      query: {},
      querystring: '',
      host: '127.0.0.1',
      hostname: '127.0.0.1',
      protocol: 'http',
      secure: 'false',
      method: 'GET',
      url: '/',
      path: '/',
      socket: {
        remoteAddress: '127.0.0.1',
        remotePort: 7001,
      },
    };
    if (req) {
      for (const key in req) {
        if (key === 'headers' || key === 'query' || key === 'socket') {
          Object.assign(request[key], req[key]);
        } else {
          request[key] = req[key];
        }
      }
    }
    const response = new http.ServerResponse(request);
    return this.createContext(request, response);
  }

  createContext(req, res) {
    const app = this;
    const context = Object.create(app.context);
    const request = context.request = Object.create(app.request);
    const response = context.response = Object.create(app.response);
    context.app = request.app = response.app = app;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.onerror = context.onerror.bind(context);
    context.originalUrl = request.originalUrl = req.url;

    /**
     * Request start time
     * @member {Number} Context#starttime
     */
    context.starttime = Date.now();
    return context;
  }
}

/**
 * 初始化的
 * 核心关键点是一个config的挂载，
 * 一个是生命周期，生命周期后面再说
 * config的挂载逻辑，写过。但写的形式需要好好的画几张图。
 */