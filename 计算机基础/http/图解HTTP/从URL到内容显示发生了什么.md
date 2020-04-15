## 经典题目

1. TCP/IP 分层管理
   应用层 http / dns
   传输层 tcp /
   网络层 ip
   数据链路层

```
速记：http/tcp/ip
```

发送端：
应用层发送一个 http 请求
传输层将 http 请求报文分割打上标记序号和端口号发给网络层
网络层增加通信目的地的 Mac 地址后转给链路层

接收端：
链路层接到数据，层层上传

URL
通过域名从 DNS 查 IP
http 协议职责：生成针对目标 web 服务器的 http 请求报文
tcp 协议职责：分割 http 报文，可靠传输
IP 协议职责：搜索对方地址，中专传送（路由层面）
tcp 协议职责：接收报文段，按序号请求重组报文

请求报文构成：请求方法、请求 uri、协议、首部字段+内容实体
请求方式：get post put delete options trace head
