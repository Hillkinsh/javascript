const EGG_LOADER = Symbol.for('egg#loader');

class EggLoader {
  load () {
    console.log('我是load1， 不是load')
  }
}

class AppWorkerLoader extends EggLoader {
  load () {
    console.log('没错，把你绕晕的就是我。')
  }
}

class EggCore {
  constructor(options={}) {
    const Loader = this[EGG_LOADER];
    console.log(this)
    console.log(Loader)
    this.loader = new Loader()
  }
  get [EGG_LOADER]() {
    return EggLoader;
  }
}
class EggApplication extends EggCore {
  constructor (options={}) {
    super(options)
    this.loader && this.loader.loadConfig && this.loader.loadConfig();
  }
}
class Application extends EggApplication {
  constructor (options = {}) {
    super()
    this.loader.load();
  }
  get [EGG_LOADER]() {
    console.log('啥时候执行这里的。。。')
    return AppWorkerLoader;
  }
}

let a = new Application()

// 啥时候执行这里的。。。
// Application {}
// [Function: AppWorkerLoader]
// 没错，把你绕晕的就是我。 （！注意不是静态的指定 EggLoader）

/**
 * 子类继承父类，父类的this相应的也是执行子类。
 */
