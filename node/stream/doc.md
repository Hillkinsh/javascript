# 总结四种流类型

## readable 可读流

data

end

方法

pipe/unpipe
read/unshift/resume

## writeable 可写流

drain

finish

pipe/unpipe

write/end

## 可读流的模式

1. 暂停模式 paused

2. 流动模式 flowing

模式切换

1、监听“data”事件
2、调用 stream.resume()方法
3、调用 stream.pipe()方法将数据发送到可写流

1、如果不存在管道目标，调用stream.pause()方法
2、如果存在管道目标，调用 stream.unpipe()并取消'data'事件监听
可读流事件：'data','readable','error','close','end'
