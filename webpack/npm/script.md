npm脚本的原理：

每当执行 npm run时，都会自动新建一个shell，在shell里面执行指定的命令。
因此只要是shell里面可以执行的命令，就可以写在npm 脚本中。

npm run的时候，新建的shell，会将当前目录的node_modules/.bin子目录加入path变量，
执行结束后再将path变量恢复成原样。

这意味着当前目录的node_module/.bin目录的所有脚本，都可以用脚本名称调用，而不必加上路径。
比如 webpack