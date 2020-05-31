# 分两步

1. 命令行启动vscode

 在vscode界面中，使用快捷键 shift + command + p

 输入 shell command； install code command in PATH

 此时命令行就可以用code . 打开一个空的vscode

 [官方文档](https://code.visualstudio.com/docs/setup/mac)

 2. 配置bashrc脚本(配置别名)

 alias devweb="code /Users/xqs/Documents/workFiles/tyc-web"

 3. 解决为什么每次终端打开都要source ~/.bashrc问题

正常情况下，直接修改.bashrc 即可。但如果不好用，就要考虑下面这种情况
 [因为默认加载了zsh](https://www.jianshu.com/p/c4946024b946)

 4. 存在问题，在关闭了vscode后配置的code不能使用
 https://github.com/Microsoft/vscode/issues/7426#issuecomment-277737150

