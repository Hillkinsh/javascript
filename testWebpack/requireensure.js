__webpack_require__.e = function requireEnsure(chunkId) {
  var promises = [];
  var installedChunkData = installedChunks[chunkId];
  
  // 判断该chunk是否已经被加载，0表示已加载。installChunk中的状态：
  // undefined：chunk未进行加载,
  // null：chunk preloaded/prefetched
  // Promise：chunk正在加载中
  // 0：chunk加载完毕
  if(installedChunkData !== 0) {
      // chunk不为null和undefined，则为Promise，表示加载中，继续等待
      if(installedChunkData) {
          promises.push(installedChunkData[2]);
      } else {
          // 注意这里installChunk的数据格式
          // 从左到右三个元素分别为resolve、reject、promise
          var promise = new Promise(function(resolve, reject) {
              installedChunkData = installedChunks[chunkId] = [resolve, reject];
          });
          promises.push(installedChunkData[2] = promise);

          // 下面代码主要是根据chunkId加载对应的script脚本
          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          var onScriptComplete;

          script.charset = 'utf-8';
          script.timeout = 120;
          if (__webpack_require__.nc) {
              script.setAttribute("nonce", __webpack_require__.nc); // 白名单
          }
          
          // jsonpScriptSrc方法会根据传入的chunkId返回对应的文件路径
          script.src = jsonpScriptSrc(chunkId);

          onScriptComplete = function (event) {
              script.onerror = script.onload = null;
              clearTimeout(timeout);
              var chunk = installedChunks[chunkId];
              if(chunk !== 0) {
                  if(chunk) {
                      var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                      var realSrc = event && event.target && event.target.src;
                      var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
                      error.type = errorType;
                      error.request = realSrc;
                      chunk[1](error);
                  }
                  installedChunks[chunkId] = undefined;
              }
          };
          var timeout = setTimeout(function(){
              onScriptComplete({ type: 'timeout', target: script });
          }, 120000);
          script.onerror = script.onload = onScriptComplete;
          head.appendChild(script);
      }
  }
  return Promise.all(promises);
};
