> 发一个npm包很简单的。按照教程很快就能发成功。一个教程的版本如下：

[Vue cli3 库模式搭建组件库并发布到 npm](https://juejin.im/post/5bbab9de5188255c8c0cb0e3)

但是按照这个东西一步步操作的时候，还是很不理解为什么这么做是对的。这不是一个 **成熟的** 的工程师该有的态度(笑 。 所以这里是对发包过程原理的总结贴。

### 1.webpack配置相关问题。chainWebpack 配置整理
![目录结构](https://github.com/Hillkinsh/javascript/blob/master/image/baojiegou.png)

> 上面结构中， src目录改成examples，新增packages目录。前者会导致项目无法运行，后者未加入webpack编译。
> 新版的 Vue CLI 解决办法是： 支持使用 vue.config.js 中的 pages 选项构建一个多页面的应用。

TODO: 这块需要找时间重新梳理一下。

### 2.编写组件


