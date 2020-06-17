# HTTP Referer

HTTP Referer是header的一部分，当浏览器向web服务器发送请求的时候，一般会带上Referer，告诉服务器该网页是从哪个页面链接过来的，服务器因此可以获得一些信息用于处理.

## 防非法链接

```java

//得到referer头
String referer = request.getHeader("referer");
System.out.println("referer="+referer);

/**
* 判断非法链接：
* 1）直接访问的话referer=null
* 2）如果当前请求不是来自广告
*/
if(referer==null || !referer.contains("/web161115/ad.html")) {
  response.getWriter().write("当前是非法链接，请回到首页。<a href='/web161115/ad.html'>首页</a>");
} else {
  //正确的链接
  response.getWriter().write("资源正在下载...");
}
```

## 图片防盗链

图片防盗链的原理和非法链接一样，反防盗链技术就是请求头加上合法refer即可。
