1.基本开发过程：
webpack.config.js

entry:
output:
mode:
module{
  rules: [] // loader
}
plugins: [] // 插件

1.基本配置
js  babel-loader, 
vue 
css
图片
字体
2. 优化

uglifyjs-webpack-plugin // 压缩js
optimize-css-assets-webpack-plugin // 压缩css
html-webpack-plugin // 压缩html和使用模版

clean-webpack-plugin // 自动清理构建目录
PostCSS // 适配移动端+补齐css3前缀

html-inline-css-webpack-plugin // 减少请求的css内联
SplitChunksPlugin // 公共脚本分离