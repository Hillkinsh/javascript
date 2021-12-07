// 离线日志
const LOG_LEVELS = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const OFFLINE_TYPE = {
  fail_log: 'fail_log',
  common_log: 'common_log',
};

function loadScript(url, callback) {
  callback = callback || function () {};
  const onload = function () {
    callback();
  };
  const onerror = function (e) {
    callback(e);
  };
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = onload;
  script.onerror = onerror;
  script.src = url;
  document.body.appendChild(script);
}

function loadZipSDK() {
  if (!loadZipSDK.sdkLoading) {
    loadZipSDK.sdkLoading = new Promise((resolve, reject) => {
      if (typeof window.JSZip === 'function') {
        return resolve();
      }
      loadScript(
        'https://cdn.bootcdn.net/ajax/libs/jszip/3.6.0/jszip.min.js',
        (e) => {
          if (e && e.type === 'error') {
            loadZipSDK.sdkLoading = null;
            reject(new Error('依赖加载失败'));
            return;
          }
          resolve(e);
        }
      );
    });
  }
  return loadZipSDK.sdkLoading;
}

function zip(fileName, content) {
  const zip = new JSZip();
  zip.file(`${fileName}.log` /*文件名*/, content /**压缩内容 */);
  return zip
    .generateAsync({
      type: 'blob', // 压缩的结果为二进制流,可用作文件上传
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6,
      },
    })
    .catch((e) => {
      console.log('e', e);
      return Promise.reject(new Error('日志内容压缩失败'));
    });
}

class IndexDBLogger {
  constructor() {
    this.dataStore = null;
  }

  connectDB() {
    if (this.dataStore) {
      return Promise.resolve(this.dataStore);
    }

    this.dataStore = new Promise((resolve, reject) => {
      const dbReq = window.indexedDB.open('LogDB', 1);

      dbReq.onerror = reject;
      dbReq.onupgradeneeded = (e) => {
        const db = e.target.result;
        const objectStore = db.createObjectStore('logs', {
          autoIncrement: true,
        });
        objectStore.createIndex('project_idx', 'project', { unique: false });
        objectStore.createIndex('log_time_idx', 'log_time', { unique: false });
        objectStore.createIndex('level_idx', 'level', { unique: false });
        objectStore.createIndex('offline_type_idx', 'offline_type', {
          unique: false,
        });
      };
      dbReq.onsuccess = (e) => {
        this.dataStore.onclose = () => {
          // 尝试修复InvalidStateError
          this.database = null;
        };
        resolve(e.target.result);
      };
    });
  }

  getStore() {
    return this.connectDB().then((db) => {
      const transaction = db.transaction(['logs'], 'readwrite');
      return transaction.objectStore('logs');
    });
  }

  read({ index, from, to, searchVal }) {
    return this.handlerDBData({ type: 'read', index, from, to, searchVal });
  }

  write(data) {
    this.getStore().then((store) => {
      const request = store.add(data);
      request.onerror = (err) => {
        this.handleError(err);
      };
    });
  }

  clear({ index, from, to, searchVal }) {
    return this.handlerDBData({ type: 'delete', index, from, to, searchVal });
  }

  handlerDBData({ index, from, to, searchVal = '', type = 'read' }) {
    return new Promise((resolve, reject) => {
      this.getStore().then((store) => {
        console.log('index', index);
        const indexStore = store.index(index);
        const result = [];
        let range;

        if (!from) {
          range = window.IDBKeyRange.only(searchVal);
        } else {
          range = window.IDBKeyRange.bound(from, to);
        }

        const request = indexStore.openCursor(range);
        request.onerror = reject;
        request.onsuccess = (e) => {
          const cursor = e.target.result;

          if (cursor) {
            const item = cursor.value;
            if (type === 'read') {
              result.push(item);
            } else if (type === 'delete') {
              store.delete(cursor.primaryKey);
            }
            cursor.continue();
          } else {
            resolve(result);
          }
        };
      });
    });
  }

  handleError(err) {
    report(err.message);
  }
}

class OfflineLog {
  // dbLogger = null;
  // static sdkLoading = false;

  constructor() {
    this.sdkLoading = false;
    this.dbLogger = new IndexDBLogger();
    this.dbLogger.connectDB();
    this.bindEvent();
  }

  bindEvent() {
    const handler = () => {
      this.openConfirmDialog()
        .then((result) => {
          alert('上传成功');
        })
        .catch((e) => {
          if (e !== 'cancle') {
            alert('上传失败');
          }
        });
    };

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 88 && e.altKey) {
        handler();
      }
    });
    document.addEventListener('touchend', (e) => {
      // >=4指点按
      console.log('e.touches.length', e.touches.length);
      if (e.touches.length >= 3) {
        handler();
      }
    });
  }

  openConfirmDialog() {
    var isOk = confirm('是否上传日志');
    if (isOk) {
      return this.uploadLog();
    }
    return Promise.reject('cancle');
  }

  saveFaillLog(data) {
    this.dbLogger.write({
      ...data,
      offline_type: OFFLINE_TYPE.fail_log,
    });
  }

  readFailLog() {
    return this.dbLogger.read({
      searchVal: OFFLINE_TYPE.fail_log,
      index: 'offline_type_idx',
    });
  }

  clearFailLog() {
    return this.dbLogger.clear({
      searchVal: OFFLINE_TYPE.fail_log,
      index: 'offline_type_idx',
    });
  }

  savelCommonLog(data) {
    this.dbLogger.write({
      ...data,
      offline_type: OFFLINE_TYPE.common_log,
    });
  }

  cleaCommonLog() {
    return this.dbLogger.clear({
      searchVal: OFFLINE_TYPE.common_log,
      index: 'offline_type_idx',
    });
  }

  packLog() {
    return this.dbLogger
      .read({ searchVal: OFFLINE_TYPE.common_log, index: 'offline_type_idx' })
      .then((result) => {
        return zip(`压缩日志-${Date.now()}`, JSON.stringify(result));
      });
  }

  uploadLog() {
    return loadZipSDK()
      .then(() => {
        return this.packLog();
      })
      .then((zipFile) => {
        return fetch(`http://www.test.com/upload`, {
          method: 'POST',
          body: zipFile,
        }).then(() => {
          this.cleaCommonLog();
        });
      });
  }
}
class Reportor {
  

  constructor({ autoUploadLevel, offlineLog }) {
    this.failCount = 0;
    this.blocked = false;
    this.reportWaitTimer = null;
    this.offlineLog = new OfflineLog();
    this.reportOfflineLog();
    this.autoUploadLevel = autoUploadLevel;
  }

  report(data) {
    const { level } = data;

    if (this.blocked || level < this.autoUploadLevel) {
      this.addOfflineLog(data);
      return;
    }

    this.reportOfflineLog();

    this.send(data).catch(() => {
      console.log('111');
      this.addOfflineLog(data, true);
    });
  }

  send(data) {
    return new Promise((res, rej) => {
      fetch(`http://www.test.com/report`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error();
          }
          res(res);
        })
        .catch((e) => {
          rej();
          this.blockReport();
        });
    });
  }

  addOfflineLog(data, isFail) {
    if (this.blocked || isFail) {
      this.offlineLog.saveFaillLog(data);
    } else {
      this.offlineLog.savelCommonLog(data);
    }
  }

  reportOfflineLog() {
    this.offlineLog.readFailLog().then((result) => {
      if (Array.isArray(result) && result.length === 0) {
        return;
      }
      this.send(result).then(() => {
        this.offlineLog.clearFailLog();
      });
    });
  }

  blockReport() {
    this.failCount += 1;
    if (this.failCount >= 3) {
      this.blocked = true;
    }
    if (!this.reportWaitTimer) {
      this.reportWaitTimer = setTimeout(() => {
        this.unblockReport();
      }, 15000);
    }
  }

  unblockReport() {
    this.blocked = false;
    this.failCount = 0;
    clearTimeout(this.reportWaitTimer);
    this.reportWaitTimer = null;
  }

  upload() {
    return this.offlineLog.uploadLog();
  }
}

const reportor = new Reportor({
  autoUploadLevel: LOG_LEVELS.info,
});

// 调用上报
reportor.report({
  project: 'admin',
  log_time: Date.now(),
  level: LOG_LEVELS.info,
});
