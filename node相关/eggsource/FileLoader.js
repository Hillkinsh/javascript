class FileLoader {

  /**
   * @class
   * @param {Object} options - options
   * @param {String|Array} options.directory - directories to be loaded
   * @param {Object} options.target - attach the target object from loaded files
   * @param {String} options.match - match the files when load, support glob, default to all js files
   * @param {String} options.ignore - ignore the files when load, support glob
   * @param {Function} options.initializer - custom file exports, receive two parameters, first is the inject object(if not js file, will be content buffer), second is an `options` object that contain `path`
   * @param {Boolean} options.call - determine whether invoke when exports is function
   * @param {Boolean} options.override - determine whether override the property when get the same name
   * @param {Object} options.inject - an object that be the argument when invoke the function
   * @param {Function} options.filter - a function that filter the exports which can be loaded
   * @param {String|Function} options.caseStyle - set property's case when converting a filepath to property list.
   */
  constructor(options) {
    assert(options.directory, 'options.directory is required');
    assert(options.target, 'options.target is required');
    this.options = Object.assign({}, defaults, options);

    // compatible old options _lowercaseFirst_
    if (this.options.lowercaseFirst === true) {
      deprecate('lowercaseFirst is deprecated, use caseStyle instead');
      this.options.caseStyle = 'lower';
    }
  }

  /**
   * attach items to target object. Mapping the directory to properties.
   * `app/controller/group/repository.js` => `target.group.repository`
   * @return {Object} target
   * @since 1.0.0
   */
  load() {
    const items = this.parse();
    const target = this.options.target;
    // debugger;
    for (const item of items) {
      debug('loading item %j', item);
      // item { properties: [ 'a', 'b', 'c'], exports }
      // => target.a.b.c = exports
      item.properties.reduce((target, property, index) => {
        let obj;
        const properties = item.properties.slice(0, index + 1).join('.');
        if (index === item.properties.length - 1) {
          if (property in target) {
            if (!this.options.override) throw new Error(`can't overwrite property '${properties}' from ${target[property][FULLPATH]} by ${item.fullpath}`);
          }
          obj = item.exports;
          if (obj && !is.primitive(obj)) {
            obj[FULLPATH] = item.fullpath;
            obj[EXPORTS] = true;
          }
        } else {
          obj = target[property] || {};
        }
        target[property] = obj;
        debug('loaded %s', properties);
        return obj;
      }, target);
    }
    return target;
  }

  /**
   * Parse files from given directories, then return an items list, each item contains properties and exports.
   *
   * For example, parse `app/controller/group/repository.js`
   *
   * ```
   * module.exports = app => {
   *   return class RepositoryController extends app.Controller {};
   * }
   * ```
   *
   * It returns a item
   *
   * ```
   * {
   *   properties: [ 'group', 'repository' ],
   *   exports: app => { ... },
   * }
   * ```
   *
   * `Properties` is an array that contains the directory of a filepath.
   *
   * `Exports` depends on type, if exports is a function, it will be called. if initializer is specified, it will be called with exports for customizing.
   * @return {Array} items
   * @since 1.0.0
   * 文件加载的这个class 明天看吧。
   */
  parse() {
    let files = this.options.match;
    if (!files) {
      files = (process.env.EGG_TYPESCRIPT === 'true' && utils.extensions['.ts'])
        ? [ '**/*.(js|ts)', '!**/*.d.ts' ]
        : [ '**/*.js' ];
    } else {
      files = Array.isArray(files) ? files : [ files ];
    }

    let ignore = this.options.ignore;
    if (ignore) {
      ignore = Array.isArray(ignore) ? ignore : [ ignore ];
      ignore = ignore.filter(f => !!f).map(f => '!' + f);
      files = files.concat(ignore);
    }

    let directories = this.options.directory;
    if (!Array.isArray(directories)) {
      directories = [ directories ];
    }

    const filter = is.function(this.options.filter) ? this.options.filter : null;
    const items = [];
    debug('parsing %j', directories);
    for (const directory of directories) {
      // debugger globby 之后跳到了路由文件，怎么做到的呢。TODO: 也算进步
      const filepaths = globby.sync(files, { cwd: directory });
      for (const filepath of filepaths) {
        const fullpath = path.join(directory, filepath);
        if (!fs.statSync(fullpath).isFile()) continue;
        // get properties
        // app/service/foo/bar.js => [ 'foo', 'bar' ]
        const properties = getProperties(filepath, this.options);
        // app/service/foo/bar.js => service.foo.bar
        const pathName = directory.split(/[/\\]/).slice(-1) + '.' + properties.join('.');
        // get exports from the file
        const exports = getExports(fullpath, this.options, pathName);

        // ignore exports when it's null or false returned by filter function
        if (exports == null || (filter && filter(exports) === false)) continue;

        // set properties of class
        if (is.class(exports)) {
          exports.prototype.pathName = pathName;
          exports.prototype.fullPath = fullpath;
        }

        items.push({ fullpath, properties, exports });
        debug('parse %s, properties %j, export %j', fullpath, properties, exports);
      }
    }

    return items;
  }

}

/**
 * 两个方法：load 和 parse。
 * 
 * load时，将
 * 
 * parse时，将 controller/home.js
 * 挂载到appWorkerLoader.app.controller上
 */