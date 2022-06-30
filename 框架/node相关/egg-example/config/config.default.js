// config/config.default.js
const path = require('path')
module.exports = (appInfo) => {
    let config = {}
    config.security = {
        csrf: {
          enable: false,
        },
    }
    config.keys = 'abc'
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
          '.tpl': 'nunjucks',
          '.ejs': 'ejs'
        },
        root: [ // 根目录
            path.join(appInfo.baseDir, 'app/view'),
            path.join(appInfo.baseDir, 'path/to/another'),
        ].join(',')
    }
    config.news = {
        pageSize: 5,
        // pageNumber: 5,
        serverUrl: 'http://capi.test63.tianyancha.com',
    }
    // config.middleware = [
    //     'robot'
    // ];
    // config.robot = {
    //     ua: [
    //     /Baiduspider/i,
    //     ]
    // };
    return config
}
