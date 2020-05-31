#!/bin/bash

# 变量的定义，常量，销毁
# readonly name="xiaomi"
# name="dami"

unset name
# for 循环
# for file in $(ls /etc)
# for file in $(ls ../); do
#     echo $file
# done

#字符串的单双引号问题
# 单引号永远是原样输出
single='hello'
# echo $single

# 双引号
# 双引号里可以有变量，也可以有转义字符
str="I know you are:\"$single\"! \n"
echo $str

# 子字符串
echo ${str:1:4}

# 数组
array=(jia, yi, bing, ding)
# echo ${array[0]}
# echo ${array[@]}
length=${#array[@]}
echo $length
for value in $array; do
    echo $value
done

