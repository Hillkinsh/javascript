  // 获取url中"?"符后的字串
  function getRequestObj() {
    const url = location.search;
    const result = {};
    if (url.indexOf("?") != -1) {
      const str = url.substr(1);
      const strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        result[strs[i].split("=")[0]] = strs[i].split("=")[1] || "";
      }
    }
    return result;
  }

  // 对象转为url字符串
  function obj2UrlString(obj) {
    let result = "";
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      result = result
        ? `${result}&${keys[i]}=${obj[keys[i]]}`
        : `${keys[i]}=${obj[keys[i]]}`;
    }
    return result ? `?${result}` : result;
  }
