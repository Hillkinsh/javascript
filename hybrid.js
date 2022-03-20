const creatObj = {
  showToast: function (toast) {
    var params = {};
    toast ? params.param1 = (toast).toString() : "";
    return {type: "nativeMethod", action: "showToast", params: params}
  },
}

const appMessage = {
  showToast: function (url) {
    var obj = creatObj["showToast"] && typeof  creatObj["showToast"] == "function" ? creatObj["showToast"](url) : {};
    this._postMessage(obj);
  },
  _postMessage: function (option, isNeedLogin) {
    // option 包括type, action, params, callback
    var sendoption = option || {};
    if (isTYCClient()) {
      if (isNeedLogin) {
        return this.appIsLogin(option)
      }
      if (isAndroid()) {
        Objective(sendoption);
      } else if (isIos()) {
        MessageHandlers(sendoption);
      }
    } else {
      openWap(sendoption)
    }
  },
}

var Objective = function (option) {
  option = option || {};
  // option.params? obj.params = option.params:'';
  option.callback ? option.callback = JSON.stringify(option.callback) : "";
  if (!option.type || !option.action) {
    return;
  }
  if (!window.objective || !window.objective.postMessage) {
    return
  }
  // alert(JSON.stringify(option));
  window.objective.postMessage(JSON.stringify(option));
};

var MessageHandlers = function (option) {
  option = option || {};
  option.params = option.params || {};
  option.callback = option.callback || {};
  if (!option.type || !option.action) {
    return;
  }
  if (!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.NativeMethod || !window.webkit.messageHandlers.NativeMethod.postMessage) {
    return
  }
  // $('#demo-option').val(JSON.stringify(option));
  window.webkit.messageHandlers.NativeMethod.postMessage({
    type: option.type,
    action: option.action,
    params: option.params,
    callback: option.callback
  })
};
/**
 * 原理简单如斯，汇总整理一下。
 * 封装一个库呗。
 */