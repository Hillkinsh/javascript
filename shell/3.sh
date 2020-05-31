#!/bin/bash

# 基本的数学运算

a=1
b=2

echo `expr $a + $b`
echo `expr $a - $b`
echo `expr $a \* $b`
echo `expr $a / $b`
echo `expr $a % $b`

# b=$a
echo $b


if [ $a -eq $b ]
then
   echo "a 等于 b"
else 
    echo "a ~== b"
fi

echo -e "\n hahaahh \n hahahha\n"

foo () {
    return $(($1 + $2))
}
foo 1 2

# echo c
