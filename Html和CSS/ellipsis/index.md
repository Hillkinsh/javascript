# 换行省略问题整理

## 1.单行

```css
.one_ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
效果的呈现是依赖了三个属性：

1. overflow: hidden 超出隐藏，不必多说。

2. white-space: nowrap; 段落中的文本不进行换行，这样就可以所有的文案都在同一行上啦，如果空间不够就会隐藏掉。

3. text-overflow: ellipsis; 当文本溢出包含元素时发生的事情。ellipsis表示省略号。

## 2.两行

两行的时候，首先不能用white-space: nowrap;因为如果用了，就没法两行。那么该怎么做呢。

```css
.two_ellipsis {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap:break-word;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}
```

-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

这个处理方式的目前只兼容webkit内核的浏览器，注意，项目中的Safari和IE出现的兼容问题来自于这里。项目中的妥协方式是8个字省略，一开始觉得low，可能也是实践后的经验总结吧。

有一种比较硬核的兼容式写法[纯 CSS 实现多行文字截断](https://github.com/happylindz/blog/issues/12)，能达到目的，但效果只能算一般. 表现在，省略号不知道自己会覆盖在文字当导致会覆盖半个文字的情况。

