#!/bin/bash

# 传参

echo "shell 脚本传参："
echo "执行的脚本名称： $0"
echo "参数1: $1"
echo "参数2: $2"
echo "参数3: $3"
echo "参数4: $4"
echo "params length: $#"
echo "params all : $*"
echo "当前进程号码：$$"
echo "最后的退出状态: $?"